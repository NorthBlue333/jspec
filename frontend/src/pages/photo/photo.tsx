import {
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
  IonActionSheet,
} from '@ionic/react';
import { trash } from 'ionicons/icons';
import React, { useState } from 'react';
import AppHeader from '../../components/header/header';
import Menu from '../../components/menu/menu';
import { Photo, usePhotoGallery } from '../../hooks/usePhotoGallery';

const Gallery: React.FC = () => {
  const { deletePhoto, photos } = usePhotoGallery();
  const [photoToDelete, setPhotoToDelete] = useState<Photo>();

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
