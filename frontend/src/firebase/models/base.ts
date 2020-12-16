import firebase from '../init';
import { Relations, WhereFilter } from './_types';

const db = firebase.firestore();

export interface BaseInterface {}

export class Base {
  public id?: string;

  private __data: firebase.firestore.DocumentData;

  public static collectionName: string;
  public static attributes: string[];

  public static parentCollection?: string;
  public parentId?: string;

  constructor(
    data: firebase.firestore.DocumentData,
    id?: string,
    parentId?: string
  ) {
    this.id = id;
    this.__data = data;
    this.parentId = parentId;
  }

  __setProperties(data: firebase.firestore.DocumentData) {
    for (const [key, value] of Object.entries(data)) {
      if (
        this.modelConstructor.attributes.includes(key) &&
        Object.prototype.hasOwnProperty.call(this, key)
      ) {
        this[key as keyof this] = value;
      }
    }
  }

  static async get<T extends typeof Base>(
    this: T,
    id: string,
    parentId?: string
  ): Promise<InstanceType<T> | null> {
    try {
      const doc = await db
        .collection(
          (this.parentCollection ?? '') +
            (parentId ? `${parentId}/` : '') +
            this.collectionName
        )
        .withConverter(this.getConverter(parentId))
        .doc(id)
        .get();
      if (!doc.exists) return null;
      return doc.data() as InstanceType<T>;
    } catch (e) {
      return null;
    }
  }

  get modelConstructor(): typeof Base {
    return this.constructor as typeof Base;
  }

  static async getAll<T extends typeof Base>(
    this: T,
    whereFilter?: WhereFilter<T>,
    parentId?: string
  ): Promise<InstanceType<T>[]> {
    const collectionRef = db.collection(
      (this.parentCollection ?? '') +
        (parentId ? `${parentId}/` : '') +
        this.collectionName
    );
    let query:
      | firebase.firestore.Query<firebase.firestore.DocumentData>
      | undefined = undefined;

    if (whereFilter) {
      for (const property of Object.keys(
        whereFilter
      ) as (keyof typeof whereFilter)[]) {
        // if where condition is on a key of T
        if (property === 'fieldPaths') {
          // if where condition is for field paths
          for (const fieldPathCondition of whereFilter[
            property
          ] as WhereFilter<T>['fieldPaths']) {
            const whereCondition = fieldPathCondition.condition;
            for (const operator of Object.keys(
              whereCondition
            ) as (keyof typeof whereCondition)[]) {
              query = collectionRef.where(
                fieldPathCondition.path,
                operator as firebase.firestore.WhereFilterOp,
                whereCondition[operator]
              );
            }
          }
          continue;
        }

        const whereCondition = whereFilter[property];
        for (const operator of Object.keys(
          whereCondition
        ) as (keyof typeof whereCondition)[]) {
          query = collectionRef.where(
            property.toString(),
            operator as firebase.firestore.WhereFilterOp,
            whereCondition[operator]
          );
        }
      }
    }

    return ((await (query ?? collectionRef)
      .withConverter(this.getConverter(parentId))
      .get()) as firebase.firestore.QuerySnapshot<
      InstanceType<T>
    >).docs.map((doc) => doc.data());
  }

  async save(): Promise<void> {
    if (this.id) {
      return db
        .collection(
          (this.modelConstructor.parentCollection ?? '') +
            (this.parentId ? `${this.parentId}/` : '') +
            this.modelConstructor.collectionName
        )
        .withConverter(this.modelConstructor.getConverter(this.parentId))
        .doc(this.id)
        .set(this);
    }

    await db
      .collection(
        (this.modelConstructor.parentCollection ?? '') +
          (this.parentId ? `${this.parentId}/` : '') +
          this.modelConstructor.collectionName
      )
      .withConverter(this.modelConstructor.getConverter(this.parentId))
      .add(this);
  }

  async loadRelations<T extends this>(
    this: T,
    relations: Relations<T>
  ): Promise<void> {
    for (const [key, relation] of Object.entries(relations)) {
      if (!relation) continue;
      if (!this[relation.key as keyof T]) continue;
      if (relation.type === 'hasOne') {
        const relationReference = (this[
          relation.key as keyof T
        ] as unknown) as firebase.firestore.DocumentReference;
        if (!relationReference) continue;
        this[key as keyof this] = ((await relation.entity.get(
          relationReference.id
        )) as unknown) as T[keyof this];
      } else {
        const relationReferences = (this[
          relation.key as keyof T
        ] as unknown) as firebase.firestore.DocumentReference[];
        if (!relationReferences.length) continue;
        const test = await relation.entity.getAll({
          fieldPaths: [
            {
              path: firebase.firestore.FieldPath.documentId(),
              condition: {
                in: relationReferences.map((ref) => ref.id),
              },
            },
          ],
        });
        this[key as keyof this] = (test as unknown) as T[keyof this];
      }
    }
  }

  static onSnapshot<T extends typeof Base>(
    this: T,
    onNext: (
      snapshot: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>
    ) => void,
    onError?: (error: firebase.firestore.FirestoreError) => void,
    onCompletion?: () => void,
    parentId?: string
  ) {
    db.collection(
      (this.parentCollection ?? '') +
        (parentId ? `${parentId}/` : '') +
        this.collectionName
    )
      .withConverter(this.getConverter(parentId))
      .onSnapshot({
        next: onNext,
        error: onError,
        complete: onCompletion,
      });
  }

  getDocRef<T extends this>(this: T) {
    return db
      .collection(
        (this.modelConstructor.parentCollection ?? '') +
          (this.parentId ? `${this.parentId}/` : '') +
          this.modelConstructor.collectionName
      )
      .doc(this.id);
  }

  static getRef<T extends typeof Base>(this: T, parentId?: string) {
    return db.collection(
      (this.parentCollection ?? '') +
        (parentId ? `${parentId}/` : '') +
        this.collectionName
    );
  }

  static getRefWithConverter<T extends typeof Base>(
    this: T,
    parentId?: string
  ) {
    return db
      .collection(
        (this.parentCollection ?? '') +
          (parentId ? `${parentId}/` : '') +
          this.collectionName
      )
      .withConverter(this.getConverter(parentId));
  }

  static getConverter<T extends typeof Base>(this: T, parentId?: string) {
    return {
      toFirestore: this.toFirestore.bind(this),
      fromFirestore: this.fromFirestore(parentId).bind(this),
    };
  }

  /**
   * Converter to firestore
   * @param model
   */
  static toFirestore<T extends typeof Base>(this: T, model: InstanceType<T>) {
    return Object.fromEntries(
      this.attributes.map((value) => [
        value,
        model[value as keyof InstanceType<T>],
      ])
    );
  }

  /**
   * Converter from firestore
   * @param snapshot
   * @param options
   */
  static fromFirestore<T extends typeof Base>(
    this: T,
    parentId?: string
  ): (
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions
  ) => any {
    const converter = (
      snapshot: firebase.firestore.QueryDocumentSnapshot,
      options: firebase.firestore.SnapshotOptions
    ) => {
      const data: firebase.firestore.DocumentData = snapshot.data(options);
      return new this(data, snapshot.id, parentId);
    };
    return converter;
  }
}
