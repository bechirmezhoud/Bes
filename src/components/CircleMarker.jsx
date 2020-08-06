import React from "react";
import { Marker } from "react-map-gl";
export default function CircleMarker({ Entry, dinamiquewh, onClick }) {
  return (
    <React.Fragment>
      <Marker latitude={Entry.position[0]} longitude={Entry.position[1]}>
        <svg
          height={`${dinamiquewh}px`}
          width={`${dinamiquewh}px`}
          style={{ transform: "translate(-50%, -50%)" }}
        >
          <circle
            cx={`${dinamiquewh / 2}px`}
            cy={`${dinamiquewh / 2}px`}
            r={`${0.05 * dinamiquewh}px`}
            fill="rgb(19, 119, 212)"
            fillOpacity="90%"
          />
          <circle
            cx={`${dinamiquewh / 2}px`}
            cy={`${dinamiquewh / 2}px`}
            r={`${0.2 * dinamiquewh}px`}
            stroke="rgb(19, 119, 212)"
            fill="rgb(19, 119, 212)"
            fillOpacity="50%"
            onClick={onClick}
          />
        </svg>
      </Marker>
    </React.Fragment>
  );
}
