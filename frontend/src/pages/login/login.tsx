import {
  IonContent,
  IonButton,
  IonItem,
  IonLabel,
  IonInput,
  IonBackButton,
  IonButtons,
  IonText,
  IonLoading,
} from '@ionic/react';
import React, { useContext, useState } from 'react';
import './login.css';
import { Redirect, useHistory } from 'react-router';
import { AppContext } from '../../context/AppContext';
import firebase from '../../firebase/init';

const Login: React.FC = () => {
  const appContext = useContext(AppContext);
  const [email, setEmail] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const isEmailValid = () =>
    !!email?.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Les champs sont requis.');
      return;
    }

    setError(undefined);
    setIsLoading(true);
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      history.push('/home');
    } catch (e) {
      setError('Vos identifiants sont invalides.');
    }
    setIsLoading(false);
  };

  if (appContext.currentPerson) return <Redirect to="/home" />;
  return (
    <IonContent fullscreen={true}>
      <IonLoading
        isOpen={isLoading}
        message={'Nous essayons de vous connecter...'}
      />
      <section className="top">
        <IonButtons slot="start">
          <IonBackButton mode="md" defaultHref="/" />
          <p className="title">Se connecter</p>
        </IonButtons>
      </section>

      <IonItem className="middle-section" lines="none">
        <IonLabel
          color={!!error || !isEmailValid() ? 'danger' : ''}
          className="label"
          position="stacked"
        >
          Adresse e-mail
        </IonLabel>
        <IonInput
          className="input"
          color={!!error || !isEmailValid() ? 'danger' : ''}
          placeholder="exemple@adresse.com"
          value={email}
          onIonChange={(e) => {
            setError(undefined);
            setEmail(e.detail.value as string);
          }}
        ></IonInput>
        <IonLabel
          color={!!error ? 'danger' : ''}
          className="label"
          position="stacked"
        >
          Mot de passe
        </IonLabel>
        <IonInput
          className="input"
          type="password"
          color={!!error ? 'danger' : ''}
          disabled={!isEmailValid()}
          placeholder="••••••••••••"
          value={password}
          onIonChange={(e) => {
            setError(undefined);
            setPassword(e.detail.value as string);
          }}
        ></IonInput>
        {!!error && <IonText color="danger">{error}</IonText>}
      </IonItem>

      <IonButton
        className="bottom-section"
        expand="block"
        disabled={!isEmailValid() || !email || !password}
        onClick={handleLogin}
      >
        Se connecter
      </IonButton>
    </IonContent>
  );
};

export default Login;
