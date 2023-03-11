import { useOutletContext } from "react-router-dom";
import { useState } from "react";
import MapWithMarker from "../Components/MapWithMarker";
import MyMapComponent from "../Components/Map/MyMapComponent";
import MapMarker from "../Components/Map/MapMarker";

export default function Home() {
  const [auth, setAuth] = useOutletContext();

  console.log(auth);

  return (
    <>
      <h1>HOME!!</h1>
      <MapMarker />
    </>
  );
}
