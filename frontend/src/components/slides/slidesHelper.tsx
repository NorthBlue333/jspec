import { IonSlides, IonSlide, IonIcon, IonText } from "@ionic/react";
import {
  checkmarkCircleOutline,
  hourglassOutline,
  personOutline,
} from "ionicons/icons";
import React, { useEffect, useRef } from "react";

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
    <IonSlides ref={slides} options={slideOpts} pager>
      <IonSlide class="ion-align-items-center">
        <IonText>
          <IonIcon class="icon" color="primary" icon={hourglassOutline} />
          <h3>Signature validée / Période de signature expirée</h3>
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
          <IonIcon class="icon" color="primary" icon={checkmarkCircleOutline} />
          <p>
            Si votre signature ou un badge de présence apparaît c'est que votre
            présence a bien été validée.
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
          <IonIcon class="icon" color="primary" icon={personOutline} />
          <p>
            Si vous êtes présent et noté absent ou si le libellé "La période de
            signature a expiré" s'affiche, vous devrez vous rapprocher d'un
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
  );
};

export default SlidesHelper;
