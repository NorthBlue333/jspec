import { IonContent, IonButton, IonImg } from '@ionic/react';
import React from 'react';
import './SignIn.css'

const SignIn: React.FC = () => {
  return (
    <IonContent>
      <IonImg className="imagelogo" src="https://lh3.googleusercontent.com/GIwutQlxkazVsiP0IdG6uYB6qHRBPBP2SzEKp3L9zFj04oO7kj2HDrgus3Q59oedhA"></IonImg>
      <section className="bottom-section">
        <IonButton className="button" expand="block" routerLink="/login" >S'inscrire</IonButton>
        <IonButton expand="block" routerLink="/login">Se connecter</IonButton>
      </section>
    </IonContent >
  );
};

export default SignIn;

