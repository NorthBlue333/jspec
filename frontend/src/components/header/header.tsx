import {
  IonHeader,
  IonToolbar,
  IonRow,
  IonImg,
  IonCol,
  IonButtons,
  IonMenuButton,
  IonIcon,
} from "@ionic/react";
import { personCircleOutline } from "ionicons/icons";
import React from "react";

const AppHeader: React.FC = () => {
  return (
    <IonHeader id="main-content" className="header">
      <IonToolbar>
        <IonRow class="ion-align-items-center">
          <IonImg className="jspecIcon" src="/assets/icon/jspec.svg"></IonImg>

          <IonCol class="ion-text-right border-right custom-pr-4">
            <p className="custom-text-primary ion-no-margin custom-uppercase custom-font-bold">
              Guilmer
            </p>
            <p className="ion-no-margin">Enzo</p>
          </IonCol>
        </IonRow>
        <IonButtons slot="end">
          <IonMenuButton className="menuButton">
            <IonIcon
              className="menuIcon"
              color="primary"
              icon={personCircleOutline}
            ></IonIcon>
          </IonMenuButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

export default AppHeader;
