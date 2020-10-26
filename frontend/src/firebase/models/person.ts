import { Base, BaseInterface } from './base'

export interface PersonInterface extends BaseInterface {
  firstname: string
  lastname: string
  className: string
}

export class Person extends Base {
  public firstname: string
  public lastname: string
  public className: string
  public static collectionName = 'people'

  constructor(
    id: string,
    firstname: string,
    lastname: string,
    className: string
  ) {
    super(id)
    this.firstname = firstname
    this.lastname = lastname
    this.className = className
  }

  static toFirestore(person: Person) {
    return {
      id: person.id,
      firstname: person.firstname,
      lastname: person.lastname,
      className: person.className,
    }
  }

  static fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions
  ) {
    const data: firebase.firestore.DocumentData = snapshot.data(options)
    return new Person(
      snapshot.id,
      data.firstname,
      data.lastname,
      data.className
    )
  }
}
