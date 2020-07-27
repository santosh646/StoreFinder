import React, { useEffect, useState } from "react";
import { IonLabel, IonItem } from "@ionic/react";
import firebase from "firebase";

export const NearestStore = () => {
  const [nearestStore, setnearestStore] = useState([] as any);
  useEffect(() => {
    const fetchData = async () => {
      const db = firebase.firestore();
      const data = await db.collection("nearestStore").get();
      setnearestStore(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    fetchData();
  }, []);
  return (
    <div>
      <div>
        <h2 className="nearStoreHeader">Nearest Store Details</h2>
        <ul>
          {nearestStore.map((nearestStore: any) => (
            <div key={nearestStore.id} className="nearStoreDetails">
              <IonItem>
                <IonLabel>{nearestStore.nearestStore}</IonLabel>
                <IonItem>
                  <IonLabel>{nearestStore.postCode}</IonLabel>
                </IonItem>
              </IonItem>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};
