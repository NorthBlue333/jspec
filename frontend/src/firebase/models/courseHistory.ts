import { Base, BaseInterface } from './base';
export interface CourseHistoryInterface extends BaseInterface {
  endDate: firebase.firestore.Timestamp;
  startDate: firebase.firestore.Timestamp;
  qrcode: string;
}

export class CourseHistory extends Base implements CourseHistoryInterface {
  public endDate!: firebase.firestore.Timestamp;
  public startDate!: firebase.firestore.Timestamp;
  public qrcode!: string;

  static collectionName = 'history';
  public static attributes = ['qrcode', 'startDate', 'endDate'];

  static parentCollection = 'courses/';

  constructor(
    data: firebase.firestore.DocumentData,
    id?: string,
    parentId?: string
  ) {
    super(data, id, parentId);
    this.__setProperties(data);
  }
}
