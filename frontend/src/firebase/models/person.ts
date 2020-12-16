import { Base, BaseInterface } from './base';
import { CourseClass } from './courseClass';

export interface PersonInterface extends BaseInterface {
  firstname: string | null;
  lastname: string;
  classIds: firebase.firestore.DocumentReference[];
}

export class Person extends Base implements PersonInterface {
  public firstname!: string | null;
  public lastname!: string;
  public classIds!: firebase.firestore.DocumentReference[];
  public userId!: string;

  public courseClasses?: CourseClass[];

  static collectionName = 'people';
  public static attributes = ['firstname', 'lastname', 'classIds', 'userId'];

  constructor(
    data: firebase.firestore.DocumentData,
    id?: string,
    parentId?: string
  ) {
    super(data, id, parentId);
    this.__setProperties(data);
  }
}
