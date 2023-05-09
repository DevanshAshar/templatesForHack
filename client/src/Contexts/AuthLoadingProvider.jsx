import  { createContext,useState } from "react";

const LoadingAuthContext = createContext()

export const LoadingAuthContextProvider = ({children}) =>{
    const [loadingAuth,setLoadingAuth] = useState(false)

    return (
        <LoadingAuthContext.Provider value ={{loadingAuth,setLoadingAuth}}>
            {children}
        </LoadingAuthContext.Provider>
    )
}   

export default LoadingAuthContext