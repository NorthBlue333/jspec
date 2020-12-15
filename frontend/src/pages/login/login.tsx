import { IonContent, IonButton, IonItem, IonLabel, IonInput, IonBackButton, IonButtons } from '@ionic/react';
import React, { useState } from 'react';
import './login.css'

const Login: React.FC<{ email?: string; password?: string }> = (props) => {

  const [email, setEmail] = useState<string | undefined>(props.email)
  const [password, setPassword] = useState<string | undefined>(props.password)

  const isEmailValid = () => !email?.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
  const isPasswordValid = () => !password?.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/);

  return (
    <IonContent fullscreen={true}>
      <section className="top">
        <IonButtons slot="start">
          <IonBackButton mode='md' defaultHref="/" />
          <p className='title'>Se connecter</p>
        </IonButtons>
      </section>

      <IonItem className="middle-section" lines="none">
        <IonLabel className="label" position="stacked">Adresse e-mail</IonLabel>
        <IonInput className="input" placeholder='exemple@adresse.com' value={email} onIonChange={(e) => setEmail(e.detail.value as string)}></IonInput>
        <IonLabel className="label" position="stacked">Mot de passe</IonLabel>
        <IonInput className="input" type='password' disabled={isEmailValid()} placeholder='••••••••••••' value={password} onIonChange={(e) => setPassword(e.detail.value as string)}></IonInput>
      </IonItem>

      <IonButton className="bottom-section" expand="block" disabled={isEmailValid() || isPasswordValid()} routerDirection="none" routerLink={`/home`} >Se connecter</IonButton>
    </IonContent>
  );
};

export default Login;
