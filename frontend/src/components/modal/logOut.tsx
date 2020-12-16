import { IonModal, IonText, IonButton, IonRow, IonLoading } from '@ionic/react';
import React, { useState } from 'react';
import firebase from '../../firebase/init';
import './logOut.css';

const LogOut: React.FC<{ showModal: boolean; closeModal: Function }> = (
  props
) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await firebase.auth().signOut();
      props.closeModal(false);
    } catch (e) {}
    setIsLoading(false);
  };

  return (
    <IonModal
      cssClass="logoutModal"
      isOpen={props.showModal}
      animated={true}
      onDidDismiss={() => props.closeModal(false)}
    >
      <IonLoading isOpen={isLoading} message={'Déconnexion...'} />
      <IonText className="ion-text-center logout custom-p-4">
        <h6>Souhaitez-vous vous déconnecter ?</h6>
        <p>
          Vous devrez saisir à nouveau vos identifiants pour accéder à vos cours
        </p>
      </IonText>
      <IonRow class="ion-justify-content-end custom-p-4">
        <IonButton
          className="logoutButton"
          fill="clear"
          onClick={() => props.closeModal(false)}
        >
          Annuler
        </IonButton>
        <IonButton
          className="logoutButton"
          fill="outline"
          onClick={handleLogout}
          routerLink={`/`}
        >
          Me déconnecter
        </IonButton>
      </IonRow>
    </IonModal>
  );
};

export default LogOut;
