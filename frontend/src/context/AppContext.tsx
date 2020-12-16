import React from 'react';
import { Course } from '../firebase/models/course';
import { CourseHistory } from '../firebase/models/courseHistory';
import { Person } from '../firebase/models/person';

export interface AppContext {
  currentPerson: null | Person;
  courses: Course[];
  nextCourseHistory: CourseHistory[];
}

export const AppContext = React.createContext<AppContext>({
  currentPerson: null,
  courses: [],
  nextCourseHistory: [],
});

export const defaultAppContext: AppContext = {
  currentPerson: null,
  courses: [],
  nextCourseHistory: [],
};
