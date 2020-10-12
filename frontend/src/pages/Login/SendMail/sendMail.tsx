import { IonContent, IonButtons, IonBackButton, IonIcon, IonText, IonButton, IonImg } from '@ionic/react';
import React from 'react';
import {checkmarkCircleOutline, home} from 'ionicons/icons'
import './sendMail.css'

const SendMail: React.FC = () => {
  return (
    <IonContent fullscreen={true} >
      <section className="top">
        <IonButtons slot="start">
          <IonBackButton mode='md' defaultHref="/" />
        </IonButtons>
      </section>

      <section className="centerBottom">
        <IonImg className="checkIcon" src="../../../assets/icon/checkmark-circle-outline.svg"></IonImg>
        <p>enzo.guilmer@gmail.com</p>
        <IonText >
          <h2>Consultez votre voîte de réception et cliquez sur le lien contenu dans l'e-mail que nous vous avons envoyé pour continuer.</h2>
        </IonText>
      </section>

      <section className='bottom'>
        <IonButton class="button" expand="block" >Ouvrir les e-mails</IonButton>
        <IonButton class="button" expand="block" >Renvoyer</IonButton>
      </section>
    </IonContent >
  );
};

export default SendMail;
