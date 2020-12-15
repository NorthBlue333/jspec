import { IonModal, IonText, IonButton } from "@ionic/react";
import React from "react";


const LogOut: React.FC<{ showModal: boolean, closeModal: Function }> = (props) => {

  return (
    <IonModal cssClass='logoutModal' isOpen={props.showModal} animated={false} onDidDismiss={() => props.closeModal(false)}>
      <IonText className='center logout'>
        <h6>Souhaitez-vous vous déconnecter ?</h6>
        <p>Vous devrez saisir à nouveau vos identifiants pour accéder à vos cours</p>
      </IonText>
      <IonButton className='logoutButton' fill='outline' onClick={() => props.closeModal(false)} routerLink={`/`}>
        Me déconnecter
      </IonButton>
      <IonButton className='logoutButton' fill='clear' onClick={() => props.closeModal(false)}>
        Annuler
      </IonButton>
    </IonModal>

  )
}

export default LogOut;