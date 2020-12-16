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
import React, { useState } from "react";
import Menu from "../../components/menu/menu";
import "./home.css";
import { helpCircleOutline } from "ionicons/icons";
import SlidesHelper from "../../components/slides/slidesHelper";
import { BarcodeScanner } from "@ionic-native/barcode-scanner";
import AppHeader from "../../components/header/header";

const Home: React.FC<{ email?: string }> = (props) => {
  const [showModal, setShowModal] = useState(false);

  const openScanner = async () => {
    const data = await BarcodeScanner.scan();
    console.log(`Barcode data: ${data.text}`);
  };

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
          <IonImg src="/assets/icon/jspec.svg"></IonImg>

          <p className="custom-text-success">
            Votre présence a bien été enregistrée
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
