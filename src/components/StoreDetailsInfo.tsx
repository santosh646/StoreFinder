import {
  IonList,
  IonLabel,
  IonItem,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";
import React from "react";
import "./StoreDetailsInfo.css";
import { useHistory } from "react-router-dom";

const StoreDetailsInfo: React.FC = () => {
  let store: any = localStorage.getItem("store");
  store = JSON.parse(store);
  const history = useHistory();
  function handleClick() {
    history.push("/home");
  }
  return (
    <div>
      <IonList>
        <IonButton color="primary" onClick={(e) => handleClick()}>
          Back
        </IonButton>
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
              <IonRow className="storeDivider">
                {store.distance / 1609.34}miles
              </IonRow>
              <IonRow className="storeDivider">{store.telephone}</IonRow>
              <IonRow className="storeDivider">Opening Times</IonRow>
              <IonRow className="storeDivider">
                {/* {store &&
                    store.openingTimes.map((store: any, index: any) => (
                      <IonItem key={store.storeName}>{store[index]}</IonItem>
                    ))} */}
              </IonRow>
            </IonGrid>
          </IonItem>
        )}
      </IonList>
    </div>
  );
};

export default StoreDetailsInfo;
