import firebase from '../init'
import { Relations, WhereFilter } from './_types'

const db = firebase.firestore()

export interface BaseInterface {}

export class Base {
  public id?: string

  private __data: firebase.firestore.DocumentData

  public static collectionName: string
  public static attributes: string[]

  constructor(data: firebase.firestore.DocumentData, id?: string) {
    this.id = id
    this.__data = data
  }

  __setProperties(data: firebase.firestore.DocumentData) {
    for (const [key, value] of Object.entries(data)) {
      if (
        this.modelConstructor.attributes.includes(key) &&
        Object.prototype.hasOwnProperty.call(this, key)
      ) {
        this[key as keyof this] = value
      }
    }
  }

  static async get<T extends typeof Base>(
    this: T,
    id: string
  ): Promise<InstanceType<T> | null> {
    try {
      const doc = await db
        .collection(this.collectionName)
        .withConverter(this.getConverter())
        .doc(id)
        .get()
      if (!doc.exists) return null
      return doc.data() as InstanceType<T>
    } catch (e) {
      return null
    }
  }

  get modelConstructor(): typeof Base {
    return this.constructor as typeof Base
  }

  static getAll<T extends typeof Base>(
    this: T,
    whereFilter?: WhereFilter<T>
  ): Promise<firebase.firestore.QuerySnapshot<InstanceType<T>>> {
    const collectionRef = db.collection(this.collectionName)
    let query:
      | firebase.firestore.Query<firebase.firestore.DocumentData>
      | undefined = undefined
    for (const property of Object.keys(
      whereFilter ?? {}
    ) as (keyof typeof whereFilter)[]) {
      const whereCondition = whereFilter![property]
      for (const operator of Object.keys(
        whereCondition
      ) as (keyof typeof whereCondition)[]) {
        query = collectionRef.where(
          property,
          operator as firebase.firestore.WhereFilterOp,
          whereCondition[operator]
        )
      }
    }

    return (query ?? collectionRef)
      .withConverter(this.getConverter())
      .get() as Promise<firebase.firestore.QuerySnapshot<InstanceType<T>>>
  }

  async save(): Promise<void> {
    if (this.id) {
      return db
        .collection(this.modelConstructor.collectionName)
        .withConverter(this.modelConstructor.getConverter())
        .doc(this.id)
        .set(this)
    }

    await db
      .collection(this.modelConstructor.collectionName)
      .withConverter(this.modelConstructor.getConverter())
      .add(this)
  }

  // async loadRelations(relations: Relations<this>): Promise<void> {
  //   for (const key of Object.keys(relations)) {
  //     const relation = relations[key as keyof this]
  //     if (relation.type === 'hasOne') {
  //       this[key as keyof this] = (await relation.entity.get(
  //         (this[relation.key] as unknown) as string
  //       )) as any
  //     } else {
  //       this[key as keyof this] = (await relation.entity.getAll({
  //         id: {
  //           in: (this[relation.key] as unknown) as string[],
  //         },
  //       })) as any
  //     }
  //   }
  // }

  static onSnapshot<T extends typeof Base>(
    this: T,
    onNext: (
      snapshot: firebase.firestore.QuerySnapshot<
        firebase.firestore.DocumentData
      >
    ) => void,
    onError?: (error: firebase.firestore.FirestoreError) => void,
    onCompletion?: () => void
  ) {
    db.collection(this.collectionName)
      .withConverter(this.getConverter())
      .onSnapshot({
        next: onNext,
        error: onError,
        complete: onCompletion,
      })
  }

  static getRef<T extends typeof Base>(this: T) {
    return db.collection(this.collectionName)
  }

  static getRefWithConverter<T extends typeof Base>(this: T) {
    return db.collection(this.collectionName).withConverter(this.getConverter())
  }

  static getConverter<T extends typeof Base>(this: T) {
    return {
      toFirestore: this.toFirestore.bind(this),
      fromFirestore: this.fromFirestore.bind(this),
    }
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
    )
  }

  /**
   * Converter from firestore
   * @param snapshot
   * @param options
   */
  static fromFirestore<T extends typeof Base>(
    this: T,
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions
  ): any {
    const data: firebase.firestore.DocumentData = snapshot.data(options)
    return new this(data, snapshot.id)
  }
}
