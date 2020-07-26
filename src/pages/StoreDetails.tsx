import { IonContent, IonPage} from '@ionic/react';
import React from 'react';
import './StoreDetails.css';
import StoreDetailsInfo from '../components/StoreDetailsInfo'

const StoreDetails: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
   <StoreDetailsInfo/>
      </IonContent>
    </IonPage>
  );
};

export default StoreDetails;
