import { Base, BaseInterface } from './base';
import type { CourseClass } from './courseClass';
import type { Person } from './person';

export interface CourseInterface extends BaseInterface {
  name: string;
  classId: firebase.firestore.DocumentReference;
  teacherId: firebase.firestore.DocumentReference;
}

export class Course extends Base implements CourseInterface {
  public name!: string;
  public classId!: firebase.firestore.DocumentReference;
  public teacherId!: firebase.firestore.DocumentReference;

  public courseClass?: CourseClass;
  public teacher?: Person;

  static collectionName = 'courses';
  public static attributes = ['name', 'classId', 'teacherId'];

  constructor(
    data: firebase.firestore.DocumentData,
    id?: string,
    parentId?: string
  ) {
    super(data, id, parentId);
    this.__setProperties(data);
  }
}
