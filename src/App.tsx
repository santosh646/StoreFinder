import React from "react";
import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonRouterOutlet,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonLabel,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/Home";
import storeDetails from "./pages/StoreDetails";
import NearMe from "./pages/NearMe";
import "./App.css";
/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

const App: React.FC = () => (
  // <IonApp>
  //   <IonReactRouter>
  //     <IonRouterOutlet>
  //     <Route path="/storeDetails" component={storeDetails} exact={true} />
  //       <Route path="/home" component={Home} exact={true} />
  //       <Route exact path="/" render={() => <Redirect to="/home" />} />
  //     </IonRouterOutlet>
  //   </IonReactRouter>
  // </IonApp>

  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route path="/storeDetails" component={storeDetails} exact={true} />

          <Route exact path="/" render={() => <Redirect to="/home" />} />
          <Route path="/home" component={Home} exact={true} />
          <Route path="/nearMe" component={NearMe} exact={true} />

          <Route path="/" render={() => <Redirect to="/home" />} exact={true} />
        </IonRouterOutlet>
        <IonTabBar slot="top" className="toolBar">
          <IonTabButton tab="home" href="/home" className="toolBar">
            <IonLabel>Home store</IonLabel>
          </IonTabButton>
          <IonTabButton tab="near" href="/nearMe" className="toolBar">
            <IonLabel>Near me</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
