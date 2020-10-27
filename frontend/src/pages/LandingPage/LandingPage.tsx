import { IonButtons, IonHeader, IonTitle, IonToolbar, IonIcon, IonMenuButton, IonImg, IonCol, IonRow, IonContent, IonText, IonFab, IonFabButton, IonButton, IonModal, IonFooter } from '@ionic/react';
import React, { useState } from 'react';
import Menu from '../../components/Menu/menu';
import './LandingPage.css'
import { add, personCircleOutline, helpCircleOutline } from 'ionicons/icons'
import SlidesHelper from '../../components/Slides/slidesHelper';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

const LandingPage: React.FC<{ email?: string }> = (props) => {

  const [showModal, setShowModal] = useState(false);

  const openScanner = async () => {
    const data = await BarcodeScanner.scan();
    console.log(`Barcode data: ${data.text}`);
  };

  return (
    <React.Fragment>
      <Menu />
      <IonModal cssClass='modal' isOpen={showModal} animated={false}>
        <SlidesHelper closeModal={setShowModal} />
      </IonModal>
      <IonHeader id="main-content" className='header'>
        <IonToolbar>
          <IonRow>
            <IonImg className='jspecIcon' src="/assets/icon/jspec.svg"></IonImg>

            <IonCol className='col'>
              <IonTitle color='primary'>Guilmer</IonTitle>
              <IonTitle>Enzo</IonTitle>
            </IonCol>
          </IonRow>
          <IonButtons slot="end">
            <IonMenuButton className="menuButton">
              <IonIcon className='menuIcon' color='primary' icon={personCircleOutline}></IonIcon>
            </IonMenuButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className='center' fullscreen={true}>

        <IonText color='primary'>
          <h4>VOTRE COURS</h4>
          <h5>Architecture micro-service</h5>
          <p className='italic light' >Aucune salle définie</p>
          <p>09:00 - 13:00</p>
        </IonText>

        <section className="pictureSection">
          {/* @TODO add image of the person Or button to take picture */}
          <IonImg src="/assets/icon/jspec.svg"></IonImg>

          <IonText color='success'>
            <p>Votre présence a bien été enregistrée</p>
          </IonText>

          <IonButton color="primary" onClick={openScanner}>
            <IonText className="white">
              cliquer ici pour scanner le Qrcode
            </IonText>
        </IonButton>

        </section>


        <div color='primary-shade' className="border">
          <IonText className='primary-dark'>
            <p>Prochain cours prévu dans 3 heures</p>
            <p className="light">Architecture micro-services à 14:00</p>
          </IonText>
        </div>

      </IonContent>




      <div className="helpButton" onClick={() => setShowModal(true)}>
        <IonRow>
          <IonIcon color='primary' className="helpIcon" icon={helpCircleOutline} />
          <IonText color='primary'>
            <p>Besoin d'aide ?</p>
          </IonText>
        </IonRow>
      </div>
      <div className="version">
        <IonText color='light'>
          <p>v1.3.4</p>
        </IonText>
      </div>
    </React.Fragment>
  );
};

export default LandingPage;
