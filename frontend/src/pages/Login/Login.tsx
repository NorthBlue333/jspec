import { IonContent, IonButton, IonItem, IonLabel, IonInput, IonBackButton, IonButtons } from '@ionic/react';
import React, { useState } from 'react';
import './Login.css'

const Login: React.FC<{ email?: string }> = (props) => {

  const [email, setEmail] = useState<string | undefined>(props.email)

  const isEmailValid = () => !email?.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)

  return (
    <IonContent fullscreen={true}>
      <section className="top">
        <IonButtons slot="start">
          <IonBackButton mode='md' defaultHref="/" />
          <p className='title'>Se connecter</p>
        </IonButtons>
      </section>

      <IonItem className="middle-section" lines="none">
        <IonLabel className="label" position="stacked">votre adresse e-mail</IonLabel>
        <IonInput className="input" placeholder='exemple@adresse.com' value={email} onIonChange={(e) => setEmail(e.detail.value as string)}></IonInput>
      </IonItem>

      <IonButton className="bottom-section" expand="block" disabled={isEmailValid()} routerDirection="none" routerLink={`/login/sendmail/${email}`} >Se connecter</IonButton>
    </IonContent>
  );
};

export default Login;
