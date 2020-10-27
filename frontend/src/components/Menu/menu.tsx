import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonIcon, IonLabel } from "@ionic/react"
import React from "react"
import {person, paperPlane} from 'ionicons/icons'

const Menu: React.FC = () => {

    return (
        <IonMenu side="end" menuId='first' content-id="main-content">
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Menu</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonList>
                    <IonItem>
                        <IonIcon icon={person}></IonIcon>
                        <IonLabel className='menuLabel'>Mention légales</IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonIcon icon={paperPlane}></IonIcon>
                        <IonLabel className='menuLabel'>Déconnexion</IonLabel>
                    </IonItem>
                </IonList>
            </IonContent>
        </IonMenu>
    )
}

export default Menu;