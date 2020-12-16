import {
  IonSlides,
  IonSlide,
  IonIcon,
  IonText,
  IonContent,
} from '@ionic/react';
import {
  checkmarkCircleOutline,
  hourglassOutline,
  personOutline,
} from 'ionicons/icons';
import React, { useEffect, useRef } from 'react';

interface SlidesProps {
  closeModal: Function;
}

const SlidesHelper: React.FC<SlidesProps> = (props) => {
  const { closeModal } = props;

  const slides = useRef<HTMLIonSlidesElement>(null);

  const slideOpts = {
    initialSlide: 0,
  };

  const closeHelper = () => {
    slides.current?.slideTo(0);
    closeModal(false);
  };

  useEffect(() => {
    slides.current?.update();
  }, [slides]);

  return (
    <IonContent class="ion-padding" scroll-y={false}>
      <IonSlides ref={slides} options={slideOpts} pager class="custom-h-full">
        <IonSlide class="ion-align-items-center">
          <IonText>
            <IonIcon
              color="primary"
              icon={hourglassOutline}
              style={{ fontSize: '4rem' }}
            />
            <p>
              Cet écran apparaît parce que vous ne pouvez plus signer pour votre
              cours actuel (en dehors des périodes de signature autorisées)
            </p>
            <p
              className="custom-text-primary custom-underline"
              onClick={() => slides.current?.slideNext()}
            >
              Suivant
            </p>
          </IonText>
        </IonSlide>

        <IonSlide>
          <IonText>
            <IonIcon
              color="primary"
              icon={checkmarkCircleOutline}
              style={{ fontSize: '4rem' }}
            />
            <p>
              Si votre signature ou un badge de présence apparaît c'est que
              votre présence a bien été validée.
            </p>
            <p
              className="custom-text-primary custom-underline"
              onClick={() => slides.current?.slideNext()}
            >
              Suivant
            </p>
          </IonText>
        </IonSlide>

        <IonSlide>
          <IonText>
            <IonIcon
              color="primary"
              icon={personOutline}
              style={{ fontSize: '4rem' }}
            />
            <p>
              Si vous êtes présent et noté absent ou si le libellé "La période
              de signature a expiré" s'affiche, vous devrez vous rapprocher d'un
              responsable administratif pour demander un rattrapage.
            </p>
            <p
              className="custom-text-primary custom-underline"
              onClick={closeHelper}
            >
              OK
            </p>
          </IonText>
        </IonSlide>
      </IonSlides>
    </IonContent>
  );
};

export default SlidesHelper;
