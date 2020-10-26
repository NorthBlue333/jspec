import firebase from 'firebase'
import { Base } from './base'

export type WhereCondition<
  T extends typeof Base,
  K extends keyof (T & InstanceType<T>)
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
    ? (T & InstanceType<T>)[K]
    : (T & InstanceType<T>)[K][]
}

export type WhereFilter<T extends typeof Base> = {
  [K in keyof Partial<T & InstanceType<T>>]: Partial<WhereCondition<T, K>>
}

export interface Relation<T extends Base> {
  key: keyof T
  type: 'hasMany' | 'hasOne'
  entity: typeof Base
}

export type Relations<T extends Base> = Record<Partial<keyof T>, Relation<T>>
