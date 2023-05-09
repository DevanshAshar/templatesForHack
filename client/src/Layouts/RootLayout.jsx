import { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import useAuth from "../Hooks/useAuth";
import LoadingAuthContext from "../Contexts/AuthLoadingProvider";

export default function RootLayout() {
  const { setAuth } = useAuth();
  const {setLoadingAuth} = useContext(LoadingAuthContext)
  const getAuth = async () => {
    setLoadingAuth(true)
    const resp = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/user/getAuth`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const respInJSON = await resp.json();
    if (resp.status === 200) {
      setAuth(respInJSON);
    } else {
      setAuth({});
    }
    setLoadingAuth(false)
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
