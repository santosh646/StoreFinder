import { IonContent, IonPage } from "@ionic/react";
import React from "react";
import { NearestStore } from "../components/NearestStore";
import "./NearMe.css";

const NearMe: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <NearestStore />
      </IonContent>
    </IonPage>
  );
};

export default NearMe;
