import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

function MapMarker({ coordinates, companyName }) {
  /*   const [coordinates, setCoordinates] = useState([
    [51.505, -0.09],
    [51.507, -0.12],
    [51.51, -0.1],
  ]); */
  const [mapData, usemapData] = useState({ coordinates, companyName });
  useEffect(() => {
    // any side effects related to the component should be in useEffect.
  }, []);

  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {mapData.coordinates.map((coord) => (
        <Marker position={coord}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default MapMarker;
