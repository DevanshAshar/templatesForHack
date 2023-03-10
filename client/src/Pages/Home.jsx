import { useOutletContext } from "react-router-dom";
import { useState } from "react";
import MapWithMarker from "../Components/MapWithMarker";

export default function Home() {
  const [auth, setAuth] = useOutletContext();

  console.log(auth);

  return (
    <>
      <h1>HOME!!</h1>
      <MapWithMarker />
    </>
  );
}
