import { IonContent, IonPage} from '@ionic/react';
import React from 'react';
import ExploreContainer from '../components/StoreFinder';
import './Home.css';


const Home: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <ExploreContainer />
      </IonContent>
    </IonPage>
  );
};

export default Home;
