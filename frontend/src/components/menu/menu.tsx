import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonIcon, IonLabel, IonRouterLink } from "@ionic/react"
import React, { useRef, useState } from "react"
import { person, paperPlane, imageOutline } from 'ionicons/icons'
import './menu.css'
import LogOut from "../modal/logOut"

const Menu: React.FC = () => {

  const [showModal, setShowModal] = useState(false);

  const menu = useRef<HTMLIonMenuElement>(null)

  const closeMenu = () => menu?.current?.close(true)


  return (
    <React.Fragment>
      <LogOut showModal={showModal} closeModal={setShowModal}></LogOut>
      <IonMenu side="end" menuId='first' content-id="main-content" ref={menu}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Menu</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            <IonItem onClick={() => { closeMenu() }}>
              <IonIcon icon={person}></IonIcon>
              <IonLabel className='menuLabel'>Mention légales</IonLabel>
            </IonItem>
            <IonItem onClick={() => { setShowModal(true); closeMenu() }}>
              <IonIcon icon={paperPlane}></IonIcon>
              <IonLabel className='menuLabel' >Déconnexion</IonLabel>
            </IonItem>
            <IonItem onClick={() => { closeMenu() }} routerLink={'/photos'} >
              <IonIcon icon={imageOutline}></IonIcon>
              <IonLabel className='menuLabel'>Gallerie Photos</IonLabel>
            </IonItem>
          </IonList>
        </IonContent>
      </IonMenu>
    </React.Fragment>

  )
}

export default Menu;