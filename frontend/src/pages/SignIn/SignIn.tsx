import { IonContent, IonButton, IonImg } from '@ionic/react';
import React, { useContext } from 'react';
import { Redirect } from 'react-router';
import { AppContext } from '../../context/AppContext';
import './SignIn.css';

const SignIn: React.FC = () => {
  const appContext = useContext(AppContext);
  if (appContext.currentPerson) return <Redirect to="/home" />;
  return (
    <IonContent>
      <IonImg
        className="imagelogo"
        src="https://lh3.googleusercontent.com/GIwutQlxkazVsiP0IdG6uYB6qHRBPBP2SzEKp3L9zFj04oO7kj2HDrgus3Q59oedhA"
      ></IonImg>
      <IonButton className="bottom-section" expand="block" routerLink="/login/">
        Se connecter
      </IonButton>
    </IonContent>
  );
};

export default SignIn;
