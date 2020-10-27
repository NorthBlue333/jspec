import { IonSlides, IonSlide, IonButton, IonIcon, IonText, IonContent } from '@ionic/react';
import { checkmarkCircleOutline, hourglassOutline, personOutline } from 'ionicons/icons';
import React, { useEffect, useRef } from 'react';
import './slidesHelper.css';

interface SlidesProps {
  closeModal: Function
}

const SlidesHelper: React.FC<SlidesProps> = (props) => {

  const { closeModal } = props

  const slides = useRef<HTMLIonSlidesElement>(null);

  const slideOpts = {
    initialSlide: 0,
  };

  const closeHelper = () => {

    slides.current?.slideTo(0)
    closeModal(false)
  }

  useEffect(() => {
    slides.current?.update()
  }, [slides]);

  return (
    <IonContent fullscreen scroll-y="false">
      <IonSlides ref={slides} options={slideOpts} pager={true}>
        <IonSlide>
          <IonText>
            <IonIcon className='icon' icon={hourglassOutline}></IonIcon>
            <h3>Signature validée / Période de signature expirée</h3>
            <p>Cet écran apparaît parce que vous ne pouvez plus signer pour votre cours actuel (en dehors des périodes de signature autorisées)</p>
            <a onClick={() => slides.current?.slideNext()}>Suivant</a>

          </IonText>

        </IonSlide>

        <IonSlide>
          <IonText>
            <IonIcon className='icon' icon={checkmarkCircleOutline}></IonIcon>
            <p>Si votre signature ou un badge de présence apparaît c'est que votre présence a bien été validée.</p>
            <a onClick={() => slides.current?.slideNext()}>Suivant</a>
          </IonText>
        </IonSlide>


        <IonSlide>
          <IonText>
            <IonIcon className='icon' icon={personOutline}></IonIcon>
            <p>Si vous êtes présent et noté absent ou si le libellé "La période de signature a expiré" s'affiche, vous devrez vous rapprocher d'un responsable administratif pour demander un rattrapage.</p>
            <a onClick={() => closeHelper()}>OK</a>
          </IonText>
        </IonSlide>

      </IonSlides>
    </IonContent>
  );
};

export default SlidesHelper;
