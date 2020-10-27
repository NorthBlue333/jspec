import { IonContent, IonButtons, IonBackButton, IonIcon, IonText, IonButton, IonImg } from '@ionic/react';
import React from 'react';
import './sendMail.css'
import { RouteComponentProps } from 'react-router';
import { checkmarkCircleOutline } from 'ionicons/icons'

export interface SendMailPageProps extends RouteComponentProps<{
  email: string;
}> { }

const SendMail: React.FC<SendMailPageProps> = ({ match }) => {
  return (
    <IonContent fullscreen={true} >
      <section className="top">
        <IonButtons slot="start">
          <IonBackButton mode='md' defaultHref={`/login/${match.params.email}`} />
        </IonButtons>
      </section>

      <section className="centerBottom">
        <IonIcon className="checkIcon" icon={checkmarkCircleOutline}></IonIcon>
        <p>{match.params.email}</p>
        <IonText >
          <h2>Consultez votre voîte de réception et cliquez sur le lien contenu dans l'e-mail que nous vous avons envoyé pour continuer.</h2>
        </IonText>
      </section>


      <IonButton class="bottom-section margin-bottom-5" routerLink={`/landing`} expand="block" >Ouvrir les e-mails</IonButton>
      <IonButton class="bottom-section" expand="block" >Renvoyer</IonButton>

    </IonContent >
  );
};

export default SendMail;
