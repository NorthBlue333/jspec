import { Base, BaseInterface } from './base';
import type { Course } from './course';
import type { Person } from './person';

export interface CourseClassInterface extends BaseInterface {
  name: string;
  coursesIds: firebase.firestore.DocumentReference[];
  personIds: firebase.firestore.DocumentReference[];
}

export class CourseClass extends Base implements CourseClassInterface {
  public name!: string;
  public coursesIds!: firebase.firestore.DocumentReference[];
  public personIds!: firebase.firestore.DocumentReference[];

  public courses?: Course[];
  public people?: Person[];

  static collectionName = 'classes';
  public static attributes = ['name', 'coursesId', 'personIds'];

  constructor(
    data: firebase.firestore.DocumentData,
    id?: string,
    parentId?: string
  ) {
    super(data, id, parentId);
    this.__setProperties(data);
  }
}
