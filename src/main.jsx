import { StrictMode } from "react";
import { Provider } from "./components/ui/provider";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
// import { ChakraProvider } from "@chakra-ui/react";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider>
      <App />
    </Provider>
  </StrictMode>
);
