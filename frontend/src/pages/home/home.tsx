import {
  IonIcon,
  IonImg,
  IonCol,
  IonRow,
  IonContent,
  IonText,
  IonButton,
  IonModal,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import Menu from "../../components/menu/menu";
import "./home.css";
import { helpCircleOutline, planetOutline } from "ionicons/icons";
import SlidesHelper from "../../components/slides/slidesHelper";
import { BarcodeScanner } from "@ionic-native/barcode-scanner";
import AppHeader from "../../components/header/header";
import { usePhotoGallery, Photo } from "../../hooks/usePhotoGallery";

const Home: React.FC<{ email?: string }> = (props) => {
  const hasCourse = true;

  const { takePhoto, photos } = usePhotoGallery();

  const [lastPhoto, setLastPhoto] = useState<Photo | null>(null)

  const [showModal, setShowModal] = useState(false);

  const [isPhotoTaken, setisPhotoTaken] = useState<boolean>(false)

  const openScanner = async () => {
    // const barecode = await BarcodeScanner.scan()
    // if (barecode.text) {
      await takePhoto()
      setisPhotoTaken(true)
    // }
  };

  useEffect(() => {
    if (isPhotoTaken)
      setLastPhoto(photos[0])

  }, [photos, isPhotoTaken])


  const showActualCourse = () => (
    <>
      <h4 className="custom-font-bold custom-underline custom-text-primary custom-uppercase">
        Votre cours
        </h4>
      <h5 className="custom-text-primary">Architecture micro-service</h5>
      <p className="custom-italic custom-text-light-shade">
        Aucune salle définie
        </p>
      <p className="custom-text-primary">09:00 - 13:00</p>

      <section className="pictureSection">
        {/* @TODO add image of the person Or button to take picture */}
        <IonImg
          style={{ maxWidth: '18em', margin: 'auto' }}
          src={lastPhoto ? lastPhoto.webviewPath : "/assets/icon/jspec.svg"}></IonImg>
        <p
          className={lastPhoto ? "custom-text-success" : 'color-danger'}>
          {lastPhoto ? 'Votre non présence a bien été enregistrée' : 'Vous devez scanner le Qrcode et prendre une photo pour montrer que vous n\'etes pas la'}
        </p>

        <IonButton
          class="custom-text-white"
          color="primary"
          onClick={openScanner}
        >
          cliquer ici pour scanner le QRcode
          </IonButton>
      </section>

      <div className="border">
        <p className="custom-text-primary-dark">
          Prochain cours prévu dans 3 heures
          </p>
        <p className="custom-text-light-dark">
          Architecture micro-services à 14:00
          </p>
      </div>
    </>
  )


  const showNoCourse = () => (
    <>
      <h4 style={{ fontWeight: 'bold' }}>Aucun cours programmé</h4>
      <section className="pictureSection">

        <IonIcon style={{ fontSize: '10em', margin: 'auto', opacity: 0.23 }} icon={planetOutline} ></IonIcon>

      </section>
    </>
  )


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
        {hasCourse ? showActualCourse() : showNoCourse()}


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
            v1.3.4
          </IonCol>
        </IonRow>
      </IonContent>
    </React.Fragment>
  );
};

export default Home;