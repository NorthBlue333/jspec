import firebase from '../init'

const db = firebase.firestore()

export interface BaseInterface {
  id: string
}

type BaseClass = {
  new (...args: any[]): Base
  collectionName: string
  getConverter: () => {
    toFirestore: (model: Base) => BaseInterface
    fromFirestore: (
      snapshot: firebase.firestore.QueryDocumentSnapshot,
      options: firebase.firestore.SnapshotOptions
    ) => Base
  }
}

export class Base {
  public id: string
  public static collectionName: string

  constructor(id: string) {
    this.id = id
  }

  static async get<T extends BaseClass>(
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

  get modelConstructor(): BaseClass {
    return this.constructor as BaseClass
  }

  static getAll<T extends BaseClass>(
    this: T
  ): Promise<firebase.firestore.QuerySnapshot<InstanceType<T>>> {
    return db
      .collection(this.collectionName)
      .withConverter(this.getConverter())
      .get() as Promise<firebase.firestore.QuerySnapshot<InstanceType<T>>>
  }

  async save(): Promise<void> {
    if (!this.id) {
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

  static getConverter() {
    return {
      toFirestore: this.toFirestore,
      fromFirestore: this.fromFirestore,
    }
  }

  /**
   * Converter to firestore
   * @param model
   */
  static toFirestore(model: Base): BaseInterface {
    return {
      id: model.id,
    }
  }

  /**
   * Converter from firestore
   * @param snapshot
   * @param options
   */
  static fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions
  ): Base {
    // const data: firebase.firestore.DocumentData = snapshot.data(options)
    return new Base(snapshot.id)
  }
}
