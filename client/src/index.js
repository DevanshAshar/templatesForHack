import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "./Theme/globalThemes";
import { AuthProvider } from "./Contexts/AuthProvider";
import { LoadingAuthContextProvider } from "./Contexts/AuthLoadingProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <AuthProvider>
    <LoadingAuthContextProvider>
      <ChakraProvider theme={theme}>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <App />
      </ChakraProvider>
    </LoadingAuthContextProvider>
  </AuthProvider>
);
