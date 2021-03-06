import React, { useState, useEffect } from "react";
import {
  IonSearchbar,
  IonLabel,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
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
import * as copy from "../utilities/constants";

const StoreFinder: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [storeData, setstoreData] = useState([] as any);
  const [validateError, setValidateError] = useState("");
  const history = useHistory();
  const [selected, setSelected] = useState({} as any);
  const [nearStore, setnearStore] = useState([] as any);
  const [apiError, setapiError] = useState([] as any);
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
    height: "140px",
    width: "100%",
  };

  const viewStore = (store: string) => {
    localStorage.setItem("store", JSON.stringify(store));
    history.push("/storeDetails");
  };
  const viewDirections = () => {
    alert("directions");
  };
  const findstore = () => {
    let searchTerm = searchText;
    if (searchTerm === "") {
      setValidateError("Please Enter Search Postcode or Address");
    } else {
      let searchCountry = "UK";
      let searchQuery = encodeURIComponent(searchTerm.replace(" ", ""));
      if (
        searchQuery.toLowerCase() === "gibraltar" ||
        searchQuery.toLowerCase() === "gx11 1aa" ||
        searchQuery.toLowerCase() === "gx111aa"
      ) {
        searchCountry = "GI";
      }
      let url =
        copy.bingMapUrl +
        encodeURIComponent(searchTerm) +
        "," +
        searchCountry +
        "&output=json&key=" +
        copy.bingMapApiKey;
      axios.get(url).then((response) => {
        let latLong =
          response.data.resourceSets[0].resources[0].geocodePoints[0]
            .coordinates;
        let centrelatlong = { lat: latLong[0], lng: latLong[1] };
        setdefaultCenter(centrelatlong);
        getStores(latLong);
      })
      .catch(err => {
        if (err.response) {
          setapiError(err.response);
        } else if (err.request) {
          setapiError(err.request);
        } else {
          setapiError(err);
        }
    })
    }
    const getStores = (latLong: string[]): any => {
      let url =
        copy.morrisonsApiUrl +
        "?apikey=" +
        copy.morissonsApiKey +
        "&distance=50000&lat=" +
        latLong[0] +
        "&limit=10&lon=" +
        latLong[1] +
        "&offset=0&storeformat=supermarket";
      axios.get(url).then((response) => {
        setstoreData(response.data.stores);
      })
      .catch(err => {
        if (err.response) {
          setapiError(err.response);
        } else if (err.request) {
          setapiError(err.request);
        } else {
          setapiError(err);
        }
      })
    };
  };



  useEffect(() => {
    const fetchData = async () => {
      const db = firebase.firestore();
      const data = await db.collection("nearestStore").get();
      setnearStore(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    fetchData();
  }, []);

  const onCreate = () => {
    const db = firebase.firestore();
    if (storeData.length > 0) {
      let postCode = storeData[0].address.postcode;
      let nearestStore = storeData[0].storeName;
      let accountid = uid();
      db.collection("nearestStore").add({
        accountId: accountid,
        postCode: postCode,
        nearestStore: nearestStore,
      });
      history.push("/nearMe");
    } else {
      setValidateError(
        "Please Search for the Nearest Stores and Click on Save"
      );
    }
  };
  return (
    <div className="container">
      <IonLabel className="validateError">{validateError}</IonLabel>
      <IonLabel className="apiError">{apiError}</IonLabel>
      <IonSearchbar
        value={searchText}
        onIonInput={(e: any) => setSearchText(e.target.value)}
      ></IonSearchbar>
      <IonButton className="customButtons" onClick={(e) => findstore()}>
        Find Store
      </IonButton>
      <IonButton className="customButtons" onClick={(e) => onCreate()}>
        Nearest Store Save
      </IonButton>

      <LoadScript googleMapsApiKey={copy.googleMapsApiKey}>
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

      <div className="scroll">
        {storeData.map((store: any) => (
          <IonGrid key={store.storeName}>
            <IonRow>
              <IonCol>
                <IonLabel className="storeName">
                  {store.storeName} - {store.address.addressLine1}
                </IonLabel>
              </IonCol>
            </IonRow>
            <IonRow>
              {store.address.addressLine2}
              {store.address.city}
            </IonRow>
            <IonRow>{store.address.postcode}</IonRow>
            <IonRow>{store.distance / 1609.34}miles</IonRow>
            <IonRow className="storeDivider">
              <IonButton
                className="customButtons"
                onClick={() => viewStore(store)}
              >
                View Store
              </IonButton>
              <IonButton
                className="customButtons"
                onClick={() => viewDirections()}
              >
                Directions
              </IonButton>
            </IonRow>
          </IonGrid>
        ))}
      </div>
    </div>
  );
};

export default StoreFinder;
