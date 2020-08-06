import React from "react";
import ReactDOM from "react-dom";
import { FirebaseAppProvider, SuspenseWithPerf } from "reactfire";

import App from "./App";

const firebaseConfig = {
  apiKey: "AIzaSyCw3mogPBJihSqIiXBXpvGG06Su-2CYTKw",
  authDomain: "hubal-2f621.firebaseapp.com",
  databaseURL: "https://hubal-2f621.firebaseio.com",
  projectId: "hubal-2f621",
  storageBucket: "hubal-2f621.appspot.com",
  messagingSenderId: "129006967321",
  appId: "1:129006967321:web:cfb1da2c6b7006bbd66888",
  measurementId: "G-3M7BTMX564"
};

const rootElement = document.getElementById("root");

ReactDOM.render(
  <React.Fragment>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <SuspenseWithPerf fallback={"loading..."}>
        <App />
      </SuspenseWithPerf>
    </FirebaseAppProvider>
  </React.Fragment>,
  rootElement
);
