import {
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
  IonActionSheet,
} from '@ionic/react';
import { trash } from 'ionicons/icons';
import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router';
import AppHeader from '../../components/header/header';
import Menu from '../../components/menu/menu';
import { AppContext } from '../../context/AppContext';
import { Photo, usePhotoGallery } from '../../hooks/usePhotoGallery';

const Gallery: React.FC = () => {
  const appContext = useContext(AppContext);
  const { deletePhoto, photos } = usePhotoGallery();
  const [photoToDelete, setPhotoToDelete] = useState<Photo>();

  if (!appContext.currentPerson) return <Redirect to="/" />;
  return (
    <React.Fragment>
      <Menu />
      <AppHeader />

      <IonContent>
        <IonGrid>
          <IonRow>
            {photos.map((photo, index) => (
              <IonCol size="6" key={index}>
                <IonImg
                  onClick={() => setPhotoToDelete(photo)}
                  src={photo.webviewPath}
                />
              </IonCol>
            ))}
            {!photos.length && (
              <IonCol class="ion-text-center">Aucune photo.</IonCol>
            )}
          </IonRow>
        </IonGrid>

        <IonActionSheet
          isOpen={!!photoToDelete}
          buttons={[
            {
              text: 'Delete',
              role: 'destructive',
              icon: trash,
              handler: () => {
                if (photoToDelete) {
                  deletePhoto(photoToDelete);
                  setPhotoToDelete(undefined);
                }
              },
            },
            {
              text: 'Cancel',
              icon: 'close',
              role: 'cancel',
            },
          ]}
          onDidDismiss={() => setPhotoToDelete(undefined)}
        />
      </IonContent>
    </React.Fragment>
  );
};

export default Gallery;
