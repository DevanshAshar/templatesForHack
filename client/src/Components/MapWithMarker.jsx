import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const MapWithMarker = () => {
  // Set initial coordinates
  const [coordinates, setCoordinates] = useState([51.505, -0.09]);

  // Function to handle click on map
  const handleMapClick = (e) => {
    setCoordinates([e.latlng.lat, e.latlng.lng]);
  };

  // Function to display marker at specified coordinates
  const showMarker = (coords) => {
    return (
      <Marker position={coords}>
        <Popup>You are here</Popup>
      </Marker>
    );
  };
  return (
    <MapContainer
      center={coordinates}
      zoom={13}
      style={{ height: "400px", width: "100%" }}
      onClick={handleMapClick}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
      />
      {showMarker(coordinates)}
    </MapContainer>
  );
};

export default MapWithMarker;
