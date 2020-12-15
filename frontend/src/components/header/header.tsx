/* eslint-disable jsx-a11y/anchor-is-valid */
import { IonHeader, IonToolbar, IonRow, IonImg, IonCol, IonTitle, IonButtons, IonMenuButton, IonIcon, IonButton, IonItem } from "@ionic/react";
import { personCircleOutline } from "ionicons/icons";
import React from "react"

const AppHeader: React.FC = () => {

  return (
    <IonHeader id="main-content" className='header'>
      <IonToolbar>
        <IonRow>
          <IonItem routerLink="/home">
            <IonImg className='jspecIcon' src="/assets/icon/jspec.svg"></IonImg>
          </IonItem>
          <IonCol className='col'>
            <IonTitle color='primary'>Guilmer</IonTitle>
            <IonTitle>Enzo</IonTitle>
          </IonCol>
        </IonRow>
        <IonButtons slot="end">
          <IonMenuButton className="menuButton">
            <IonIcon className='menuIcon' color='primary' icon={personCircleOutline}></IonIcon>
          </IonMenuButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  )
}

export default AppHeader;