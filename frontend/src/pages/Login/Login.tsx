import { IonContent, IonButton, IonItem, IonLabel, IonInput, IonBackButton, IonButtons } from '@ionic/react';
import React from 'react';
import './Login.css'

const Login: React.FC = () => {
  return (
    <IonContent fullscreen={true} >
      <section className="top">
        <IonButtons slot="start">
          <IonBackButton mode='md' defaultHref="/" />
          <p className='title'>Se connecter</p>
        </IonButtons>
      </section>

      <section className="center">
        <IonItem lines="none">
          <IonLabel className="label" position="stacked">votre adresse e-mail</IonLabel>
          <IonInput className="input" placeholder='exemple@adresse.com'></IonInput>
        </IonItem>
      </section>
      <section className='bottom'>
        <IonButton class="button" expand="block" routerLink="/login/sendmail">Se connecter</IonButton>
      </section>
    </IonContent >
  );
};

export default Login;
