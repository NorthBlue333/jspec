import {
  IonHeader,
  IonToolbar,
  IonRow,
  IonImg,
  IonCol,
  IonButtons,
  IonMenuButton,
  IonIcon,
} from '@ionic/react';
import { personCircleOutline } from 'ionicons/icons';
import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import { AppContext } from '../../context/AppContext';

const AppHeader: React.FC = () => {
  const appContext = useContext(AppContext);
  const history = useHistory();
  return (
    <IonHeader id="main-content" className="header">
      <IonToolbar>
        <IonRow class="ion-align-items-center">
          <IonImg
            className="jspecIcon"
            src="/assets/icon/jspec.svg"
            onClick={() => history.push('/home')}
          ></IonImg>

          <IonCol class="ion-text-right border-right custom-pr-4">
            <p className="custom-text-primary ion-no-margin ion-text-uppercase custom-font-bold">
              {appContext.currentPerson?.firstname}
            </p>
            <p className="ion-no-margin">
              {appContext.currentPerson?.lastname}
            </p>
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
