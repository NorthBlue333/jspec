import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { IonApp, IonLoading, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

import './theme/variables.css';
import './theme/main.css';

import SignIn from './pages/SignIn/SignIn';
import Login from './pages/login/login';
import Home from './pages/home/home';
import { AppContext } from './context/AppContext';
import firebase from './firebase/init';
import { Person } from './firebase/models/person';
import Gallery from './pages/photo/photo';
import { CourseClass } from './firebase/models/courseClass';
import { CourseHistory } from './firebase/models/courseHistory';
import { Course } from './firebase/models/course';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | undefined>(undefined);
  const [currentPerson, setCurrentPerson] = useState<Person | null>(null);
  const [currentCourses, setCurrentCourses] = useState<Course[]>([]);
  const [nextCourseHistory, setNextCourseHistory] = useState<CourseHistory[]>(
    []
  );

  useEffect(() => {
    return firebase.auth().onAuthStateChanged(async function (user) {
      if (user) {
        const res = await Person.getAll({
          userId: {
            '==': user.uid,
          },
        });
        if (!res[0]) {
          await firebase.auth().signOut();
          return;
        }
        const personRes = res[0];
        await personRes.loadRelations({
          courseClasses: {
            key: 'classIds',
            type: 'hasMany',
            entity: CourseClass,
          },
        });
        const resCourses = (
          await Promise.all(
            (personRes.courseClasses ?? []).map((courseClass) => {
              return Course.getAll({
                classId: {
                  '==': courseClass.getDocRef(),
                },
              });
            })
          )
        ).flat();
        const resHistory: Promise<CourseHistory[]>[] = [];
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        for (const course of resCourses) {
          resHistory.push(
            CourseHistory.getAll(
              {
                startDate: {
                  '>=': firebase.firestore.Timestamp.fromDate(today),
                },
              },
              course.id
            )
          );
        }
        setNextCourseHistory(
          (await Promise.all(resHistory))
            .flat()
            .sort((a, b) => b.startDate.toMillis() - a.startDate.toMillis())
        );
        setCurrentCourses(resCourses);
        setCurrentPerson(personRes);
        setIsLoggedIn(true);
      } else {
        setCurrentCourses([]);
        setCurrentPerson(null);
        setIsLoggedIn(false);
      }
    });
  }, []);

  return (
    <AppContext.Provider
      value={{
        currentPerson,
        courses: currentCourses,
        nextCourseHistory,
      }}
    >
      <IonApp>
        <IonLoading
          isOpen={isLoggedIn === undefined}
          message={'Chargement...'}
        />
        <IonReactRouter>
          <IonRouterOutlet>
            <Route path="/" component={SignIn} exact={true} />

            <Route path="/login" component={Login} exact={true} />

            <Route path="/home" component={Home} exact={true} />
            <Route path="/photos" component={Gallery} exact={true} />
          </IonRouterOutlet>
        </IonReactRouter>
      </IonApp>
    </AppContext.Provider>
  );
};

export default App;
