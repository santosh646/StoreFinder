import { IonContent, IonPage} from '@ionic/react';
import React from 'react';
import StoreFinder from '../components/StoreFinder';
import './Home.css';


const Home: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <StoreFinder />
      </IonContent>
    </IonPage>
  );
};

export default Home;
