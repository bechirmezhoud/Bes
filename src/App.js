import React, { useState, useEffect } from "react";
import "./styles.css";
import ReactMapGL, { Popup } from "react-map-gl";

import FormAdd from "./components/FormAdd";
import CircleMarker from "./components/CircleMarker";

import { useFirestoreCollectionData, useFirestore } from "reactfire";

export default function App() {
  const [logEntries, setLogEntries] = useState([]);
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 34.41418745308229,
    longitude: 9.530643008655552,
    zoom: 6
  });
  const [loaded, setLoaded] = useState(false);
  const [showPopup, setShowPopup] = useState(null);
  const [addEntryLocation, setAddEntryLocation] = useState(null);
  const [dinamiquewh, setDinamiquewh] = useState(100 * viewport.zoom);
  const [showForm, setShowForm] = useState(false);
  const showAddMarkerPopup = event => {
    const [longitude, latitude] = event.lngLat;
    setAddEntryLocation([latitude, longitude]);
  };
  const logs = useFirestoreCollectionData(
    useFirestore().collection("announce")
  );
  useEffect(() => setLogEntries(logs), [logs]);

  return (
    <React.Fragment>
      <ReactMapGL
        {...viewport}
        mapStyle="mapbox://styles/thecjreynolds/ck117fnjy0ff61cnsclwimyay"
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onViewportChange={e => {
          setViewport(e);
          setDinamiquewh(6 * e.zoom);
        }}
        onDblClick={e => {
          showAddMarkerPopup(e);
          setShowForm(false);
        }}
        onClick={() => {
          setAddEntryLocation(null);
          setShowForm(false);
        }}
        onLoad={() => setLoaded(true)}
      >
        {loaded &&
          logEntries.map(entry => (
            <div key={logEntries.indexOf(entry)}>
              <CircleMarker
                Entry={entry}
                dinamiquewh={dinamiquewh}
                onClick={() => setShowPopup(logEntries.indexOf(entry))}
              />
              {showPopup === logEntries.indexOf(entry) && (
                <Popup
                  latitude={entry.position[0]}
                  longitude={entry.position[1]}
                  onClose={() => setShowPopup(null)}
                >
                  {entry.description}
                </Popup>
              )}
            </div>
          ))}
        {addEntryLocation && (
          <CircleMarker
            Entry={{ position: addEntryLocation }}
            dinamiquewh={dinamiquewh}
          />
        )}
      </ReactMapGL>
      {addEntryLocation && (
        <>
          <div
            className="form-btn"
            style={
              showForm
                ? {
                    width: "80vw",
                    height: "80vh",
                    bottom: "10vh",
                    left: "10vw",
                    borderRadius: 20,
                    cursor: "default",
                    background:
                      "radial-gradient(166.67% 2021.63% at 0% 13.73%,#ebebeb 0%,#c2c2c2 100%)"
                  }
                : {
                    width: "8vw",
                    height: "10vh",
                    bottom: "10vh",
                    left: "30vw"
                  }
            }
          >
            {showForm && (
              <FormAdd
                latitude={addEntryLocation[0]}
                longitude={addEntryLocation[1]}
              />
            )}
            {!showForm && (
              <div className="Addbtn" onClick={() => setShowForm(true)}>
                <p className="AddSign">+</p>
              </div>
            )}
          </div>
        </>
      )}
    </React.Fragment>
  );
}
