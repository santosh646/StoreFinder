import {
  IonList,
  IonLabel,
  IonItem,
  IonGrid,
  IonRow,
  IonCol,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
} from "@ionic/react";
import React from "react";
import "./StoreDetailsInfo.css";

const StoreDetailsInfo: React.FC = () => {
  let store: any = localStorage.getItem("store");
  store = JSON.parse(store);
  return (
    <div>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" text="Back" className="backButton" />
          </IonButtons>
          <IonLabel>Store Details</IonLabel>
        </IonToolbar>
      </IonHeader>
      <IonList>
        {store && (
          <IonItem key={store.storeName}>
            <IonGrid>
              <IonRow className="storeDivider">
                <IonCol>
                  <IonLabel className="storeName">
                    {store.storeName} - {store.address.addressLine1}
                  </IonLabel>
                </IonCol>
              </IonRow>
              <IonRow className="storeDivider">
                {store.address.addressLine2}
              </IonRow>
              <IonRow>{store.address.city}</IonRow>
              <IonRow className="postcode">{store.address.postcode}</IonRow>
              <IonRow className="storeDivider">
                {store.distance / 1609.34}miles
              </IonRow>
              <IonRow className="storeDivider">{store.telephone}</IonRow>
            </IonGrid>
          </IonItem>
        )}
      </IonList>
    </div>
  );
};

export default StoreDetailsInfo;
