import React from "react";
import {IonGrid, IonRow, IonCol } from "@ionic/react";

export const NearestStore = ({ nearestStore }: any) => {
//   const [storeName, setStoreName] = React.useState(nearestStore.nearestStore);
//   const [postCode, setPostcode] = React.useState(nearestStore.postCode);
//   const [accountId, setAccountId] = React.useState(nearestStore.accountId);
  return (
    <div>
      <IonGrid>
        <IonRow>
          <IonCol>Account ID:{nearestStore.accountId}</IonCol>
        </IonRow>
        <IonRow>
          <IonCol>Store Name:{nearestStore.storeName}</IonCol>
        </IonRow>
        <IonRow>
          <IonCol>Post Code:{nearestStore.postCode}</IonCol>
        </IonRow>
      </IonGrid>
    </div>
  );
};
