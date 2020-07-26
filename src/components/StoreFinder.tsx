import React, { useState, useEffect } from "react";
import {
  IonItem,
  IonSearchbar,
  IonList,
  IonLabel,
  IonButton,
} from "@ionic/react";
import axios from "axios";
import "./StoreFinder.css";
import { useHistory } from "react-router-dom";
import firebase from "../Firebase";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import uid from "uid";

const StoreFinder: React.FC = () => {
  const [nearestStore, setnearestStore] = useState([] as any);
  const [searchText, setSearchText] = useState("");
  const [storeData, setstoreData] = useState([] as any);
  const [validateError, setValidateError] = useState("");
  const history = useHistory();
  const [selected, setSelected] = useState({} as any);
  const [defaultCenter, setdefaultCenter] = useState({
    lat: 51.063202,
    lng: -1.308,
  } as any);

  const onSelect = (item: any) => {
    let latlong = { lat: item.location.latitude, lng: item.location.longitude };
    item["latlng"] = latlong;
    setSelected(item);
  };
  const mapStyles = {
    height: "500px",
    width: "500px",
  };

  const viewStore=(store: string)=> {
    localStorage.setItem("store", JSON.stringify(store));
    history.push("/storeDetails");
  }
  useEffect(() => {
    const fetchData = async () => {
      const db = firebase.firestore();
      const data = await db.collection("nearestStore").get();
      setnearestStore(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    fetchData();
  }, []);

  const viewDirections =() =>{
    alert("directions");
  }
  const findstore=() =>{
    let searchTerm = searchText;
    if (searchTerm === "") {
      setValidateError("Please Enter Search Postcode or Address");
    } else {
      var searchCountry = "UK";
      var searchQuery = encodeURIComponent(searchTerm.replace(" ", ""));
      if (
        searchQuery.toLowerCase() === "gibraltar" ||
        searchQuery.toLowerCase() === "gx11 1aa" ||
        searchQuery.toLowerCase() === "gx111aa"
      ) {
        searchCountry = "GI";
      }
      var url =
        "https://dev.virtualearth.net/REST/v1/Locations?query=" +
        encodeURIComponent(searchTerm) +
        "," +
        searchCountry +
        "&output=json&key=" +
        "AlOkrbwwv3dnla6PXW82LiolGDeOzIP6qyFIX5C95HFBcWkAId5HRFfN1ORuK5y5";
      axios.get(url).then(function (response) {
        let latLong =
          response.data.resourceSets[0].resources[0].geocodePoints[0]
            .coordinates;
        let centrelatlong = { lat: latLong[0], lng: latLong[1] };
        setdefaultCenter(centrelatlong);
        getStores(latLong);
      });
    }
    const getStores=(latLong: string[]): any =>{
      var url =
        "https://api.morrisons.com/location/v2//stores?apikey=kxBdM2chFwZjNvG2PwnSn3sj6C53dLEY&distance=50000&lat=" +
        latLong[0] +
        "&limit=10&lon=" +
        latLong[1] +
        "&offset=0&storeformat=supermarket";
      axios.get(url).then(function (response) {
        console.log(response);
        setstoreData(response.data.stores);
      });
    }
  }

  const onCreate = () => {
    const db = firebase.firestore();
    if(storeData.length>0){
      let accountid = uid();
      let postcode = storeData[0].address.postcode;
      let storename = storeData[0].storeName;
    db.collection("nearestStore").add({
      accountId: accountid,
      postCode: postcode,
      nearestStore: storename,
    });
  }
  else{
    setValidateError("Please Search for the Nearest Stores and Click on Save")
  }
  };
  return (
    <div className="container">
      <LoadScript googleMapsApiKey="AIzaSyB8EBao-RrR2aJmvSM9Bpk1JD8MMCm998I">
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={10}
          center={defaultCenter}
        >
          {storeData &&
            storeData.map((item: any) => {
              let latlong = {
                lat: item.location.latitude,
                lng: item.location.longitude,
                name: item.name,
              };
              return (
                <Marker
                  key={item.name}
                  position={latlong}
                  onClick={() => onSelect(item)}
                />
              );
            })}
          {selected.location && (
            <InfoWindow
              position={selected.latlng}
              onCloseClick={() => setSelected({})}
            >
              <p>{selected.storeName}</p>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
      <IonLabel className="validateError">{validateError}</IonLabel>
      <div>
        <h2 className="nearStoreHeader">Nearest Store Details</h2>
        <ul>
          {nearestStore.map((nearestStore: any) => (
            <li key={nearestStore.id} className="storeDivider">
              {/* <NearestStore nearestStore={nearestStore} /> */}
              <IonLabel className="nearStoreLabel"> Account ID</IonLabel>:
              {nearestStore.accountId}
              <IonLabel className="nearStoreLabel">Store Name</IonLabel>:
              {nearestStore.nearestStore}
              <IonLabel className="nearStoreLabel">Post Code</IonLabel>:
              {nearestStore.postCode}
            </li>
          ))}
        </ul>
      </div>
      <IonSearchbar
        value={searchText}
        onIonInput={(e: any) => setSearchText(e.target.value)}
      ></IonSearchbar>
      <IonButton color="primary" onClick={(e) => findstore()}>
        Find Store
      </IonButton>
      <IonButton color="primary" onClick={(e) => onCreate()}>
          Nearest Store Save
        </IonButton>
      <IonList>
        {storeData.map((store: any) => (
          <IonItem key={store.storeName}>
            <IonLabel>
              {store.storeName}-{store.address.addressLine1}
            </IonLabel>
            <IonLabel>
              {store.address.addressLine2}
              {store.address.county}
              {store.address.city}
              {store.address.postcode}
              {store.address.country}
            </IonLabel>
            <IonLabel>{store.distance / 1609.34}miles</IonLabel>
            <IonButton color="primary" onClick={() => viewStore(store)}>
              View Store
            </IonButton>
            <IonButton color="primary" onClick={() => viewDirections()}>
              Directions
            </IonButton>
          </IonItem>
        ))}
      </IonList>
    </div>
  );
};

export default StoreFinder;
