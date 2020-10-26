import { Base, BaseInterface } from './base'

export interface PersonInterface extends BaseInterface {
  firstname: string | null
  lastname: string
  classIds?: string[]
}

export class Person extends Base implements PersonInterface {
  public firstname!: string | null
  public lastname!: string
  public classIds?: string[]

  static collectionName = 'people'
  public static attributes = ['firstname', 'lastname', 'classIds']

  constructor(data: firebase.firestore.DocumentData, id?: string) {
    super(data, id)
    this.__setProperties(data)
  }
}
