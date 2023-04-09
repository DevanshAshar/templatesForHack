import { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import AuthContext from "../Contexts/AuthProvider";

export default function RootLayout() {
  const { setAuth } = useContext(AuthContext);
  const getAuth = async () => {
    const resp = await fetch("http://localhost:5000/user/getAuth", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const respInJSON = await resp.json();
    if (resp.status == 200) {
      setAuth(respInJSON);
    } else {
      setAuth({})
    }
  };

  useEffect(() => {
    getAuth();
  }, []);

  return (
    <main className="main">
      <Navbar />
      <Outlet />
    </main>
  );
}
