import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import { Spinner } from "@chakra-ui/react";
import LoadingAuthContext from "../Contexts/AuthLoadingProvider";
import { useContext } from "react";

export default function AuthLayout() {
  const { auth } = useAuth();
  const { authLoading } = useContext(LoadingAuthContext);

  const checkingForNullObjectForAuthObject = () => {
    //returns true when the auth is {} that is not logged in or else it returns false
    return Object.keys(auth).length === 0;
  };

  if(authLoading){
    <Spinner></Spinner>
  }
  console.log(checkingForNullObjectForAuthObject)

  return checkingForNullObjectForAuthObject?  <Navigate to="/login" /> :<Outlet /> 
}

