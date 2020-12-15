import { IonContent, IonGrid, IonRow, IonCol, IonImg } from '@ionic/react';
import React from 'react';
import AppHeader from '../../components/header/header';
import Menu from '../../components/menu/menu';

const Photo: React.FC = () => {

  const photos = ['/assets/icon/jspec.svg', '/assets/icon/jspec.svg', '/assets/icon/jspec.svg', '/assets/icon/jspec.svg']

  const renderPhotos = () => {
    return photos.map(photo => (
      <IonCol size='6' >
        <IonImg src={photo}></IonImg>
      </IonCol>
    ))
  }

return (
  <React.Fragment>
    <Menu />
    <AppHeader />

    <IonContent fullscreen={true}>
      <IonGrid>
        <IonRow>
          {renderPhotos()}
        </IonRow>
      </IonGrid>
    </IonContent>
  </React.Fragment>

);
};

export default Photo;
