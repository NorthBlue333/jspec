import {
  IonIcon,
  IonImg,
  IonCol,
  IonRow,
  IonContent,
  IonText,
  IonButton,
  IonModal,
} from '@ionic/react';
import React, { useContext, useEffect, useState } from 'react';
import './home.css';
import { planetOutline } from 'ionicons/icons';
import SlidesHelper from '../../components/slides/slidesHelper';
import AppHeader from '../../components/header/header';
import { usePhotoGallery, Photo } from '../../hooks/usePhotoGallery';
import Menu from '../../components/menu/menu';
import './home.css';
import { helpCircleOutline } from 'ionicons/icons';
import { Redirect } from 'react-router';
import { AppContext } from '../../context/AppContext';
import { Course } from '../../firebase/models/course';
import { CourseHistory } from '../../firebase/models/courseHistory';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

const Home: React.FC<{ email?: string }> = (props) => {
  const appContext = useContext(AppContext);
  const { takePhoto, photos } = usePhotoGallery();
  const [lastPhoto, setLastPhoto] = useState<Photo | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isPhotoTaken, setisPhotoTaken] = useState<boolean>(false);

  const now = new Date().getTime();
  const foundCurrentCourseHistory = appContext.nextCourseHistory.find(
    (courseHistory) =>
      courseHistory.startDate.toMillis() <= now &&
      courseHistory.endDate.toMillis() >= now
  );
  const foundCurrentCourse = appContext.courses.find(
    (course) => course.id === foundCurrentCourseHistory?.parentId
  );
  const currentCourse: {
    course: Course;
    courseHistory: CourseHistory;
  } | null =
    foundCurrentCourse && foundCurrentCourseHistory
      ? {
          course: foundCurrentCourse,
          courseHistory: foundCurrentCourseHistory,
        }
      : null;

  const foundNextCourseHistory = appContext.nextCourseHistory.find(
    (courseHistory) => courseHistory.startDate.toMillis() > now
  );
  const foundNextCourse = appContext.courses.find(
    (course) => course.id === foundCurrentCourseHistory?.parentId
  );
  const nextCourse: {
    course: Course;
    courseHistory: CourseHistory;
  } | null =
    foundNextCourseHistory && foundNextCourse
      ? {
          course: foundNextCourse,
          courseHistory: foundNextCourseHistory,
        }
      : null;

  const openScanner = async () => {
    const barecode = await BarcodeScanner.scan();
    if (barecode.text) {
      await takePhoto();
      setisPhotoTaken(true);
    }
  };

  useEffect(() => {
    if (isPhotoTaken) setLastPhoto(photos[0]);
  }, [photos, isPhotoTaken]);

  const showActualCourse = () => (
    <>
      <h4 className="custom-font-bold custom-underline custom-text-primary ion-text-uppercase">
        Votre cours
      </h4>
      <h5 className="custom-text-primary">{currentCourse?.course.name}</h5>
      {/* <p className="custom-italic custom-text-light-shade">
        Aucune salle définie
      </p> */}
      <p className="custom-text-primary">
        {currentCourse?.courseHistory.startDate
          .toDate()
          .toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
        &nbsp;-&nbsp;
        {currentCourse?.courseHistory.endDate
          .toDate()
          .toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
      </p>

      <section className="pictureSection">
        {/* @TODO add image of the person Or button to take picture */}
        <IonImg
          style={{ maxWidth: '18em', margin: 'auto' }}
          src={lastPhoto ? lastPhoto.webviewPath : '/assets/icon/jspec.svg'}
        ></IonImg>
        <p className={lastPhoto ? 'custom-text-success' : 'color-danger'}>
          {lastPhoto
            ? 'Votre non présence a bien été enregistrée'
            : "Vous devez scanner le Qrcode et prendre une photo pour montrer que vous n'etes pas la"}
        </p>

        <IonButton
          class="custom-text-white"
          color="primary"
          onClick={openScanner}
        >
          Cliquer ici pour scanner le QRcode
        </IonButton>
      </section>
    </>
  );

  const showNextCourse = () => (
    <div className="border">
      <p className="custom-text-primary-dark">
        Prochain cours prévu dans{' '}
        {(
          ((nextCourse?.courseHistory.startDate.toMillis() ?? now) - now) /
          1000 /
          60 /
          60
        ).toFixed(0)}{' '}
        heure(s)
      </p>
      <p className="custom-text-light-dark">
        {nextCourse?.course.name} le{' '}
        {nextCourse?.courseHistory.startDate
          .toDate()
          .toLocaleDateString('fr-FR')}
        &nbsp;à&nbsp;
        {nextCourse?.courseHistory.startDate
          .toDate()
          .toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
      </p>
    </div>
  );

  const showNoCourse = () => (
    <>
      <h4 className="custom-font-bold custom-text-primary">
        Aucun cours programmé
      </h4>
      <section className="pictureSection">
        <IonIcon
          style={{ fontSize: '10em', margin: 'auto', opacity: 0.23 }}
          icon={planetOutline}
        ></IonIcon>
      </section>
    </>
  );
  console.log(appContext.currentPerson);
  if (!appContext.currentPerson) return <Redirect to="/" />;
  return (
    <React.Fragment>
      <Menu />
      <IonModal
        cssClass="modal"
        isOpen={showModal}
        animated={false}
        onDidDismiss={() => setShowModal(false)}
      >
        <SlidesHelper closeModal={setShowModal} />
      </IonModal>
      <AppHeader />

      <IonContent
        class="ion-text-center custom-position-relative"
        forceOverscroll
      >
        {!!currentCourse ? showActualCourse() : showNoCourse()}
        {!!nextCourse && showNextCourse()}

        <IonRow class="custom-position-fixed custom-w-full ion-align-items-center custom-bottom-0 custom-bg-white max-h-60px">
          <IonCol class="custom-pl-4">
            <IonText color="primary">
              <IonRow
                class="ion-align-items-center"
                onClick={() => setShowModal(true)}
              >
                <IonIcon
                  size="large"
                  color="primary"
                  icon={helpCircleOutline}
                />
                <span className="custom-pl-4 custom-font-bold custom-text-sm">
                  Besoin d'aide ?
                </span>
              </IonRow>
            </IonText>
          </IonCol>
          <IonCol class="custom-text-light-shade ion-text-right custom-pr-4">
            v0.8.0
          </IonCol>
        </IonRow>
      </IonContent>
    </React.Fragment>
  );
};

export default Home;
