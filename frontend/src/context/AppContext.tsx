import React from 'react';
import { Person } from '../firebase/models/person';

export interface AppContext {
  currentPerson: null | Person;
}

export const AppContext = React.createContext<AppContext>({
  currentPerson: null,
});

export const defaultAppContext: AppContext = {
  currentPerson: null,
};
