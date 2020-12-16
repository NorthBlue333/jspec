import {
  IonMenu,
  IonContent,
  IonList,
  IonItem,
  IonIcon,
  IonLabel,
} from '@ionic/react';
import React, { useRef, useState } from 'react';
import { imageOutline, logOutOutline } from 'ionicons/icons';
import LogOut from '../modal/logOut';

const Menu: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const menu = useRef<HTMLIonMenuElement>(null);
  const closeMenu = () => menu?.current?.close(true);

  return (
    <React.Fragment>
      <LogOut showModal={showModal} closeModal={setShowModal}></LogOut>
      <IonMenu side="end" menuId="menu" content-id="main-content">
        <IonContent>
          <IonList>
            <IonItem
              onClick={() => {
                setShowModal(true);
                closeMenu();
              }}
            >
              <IonIcon icon={logOutOutline}></IonIcon>
              <IonLabel className="menuLabel">Déconnexion</IonLabel>
            </IonItem>
            <IonItem
              onClick={() => {
                closeMenu();
              }}
              routerLink={'/photos'}
            >
              <IonIcon icon={imageOutline}></IonIcon>
              <IonLabel className="menuLabel">Galerie Photos</IonLabel>
            </IonItem>
          </IonList>
        </IonContent>
      </IonMenu>
    </React.Fragment>
  );
};

export default Menu;
