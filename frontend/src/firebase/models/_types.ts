import firebase from 'firebase';
import { Base } from './base';

export type WhereCondition<
  T extends typeof Base,
  K extends keyof (T & InstanceType<T>) | undefined = undefined
> = {
  [O in firebase.firestore.WhereFilterOp]: O extends
    | '<'
    | '<='
    | '=='
    | '>'
    | '>='
    | '!='
    | 'array-contains'
    | 'array-contains-any'
    ? K extends keyof (T & InstanceType<T>)
      ? (T & InstanceType<T>)[K]
      : any
    : K extends keyof (T & InstanceType<T>)
    ? (T & InstanceType<T>)[K][]
    : any;
};

export type WhereFilter<T extends typeof Base> = {
  [K in keyof Partial<T & InstanceType<T>>]: Partial<WhereCondition<T, K>>;
} & {
  fieldPaths?: {
    path: firebase.firestore.FieldPath;
    condition: Partial<WhereCondition<T>>;
  }[];
};

export interface Relation<T extends Base> {
  key: keyof T;
  type: 'hasMany' | 'hasOne';
  entity: typeof Base;
}

export type Relations<T extends Base> = Partial<Record<keyof T, Relation<T>>>;
