import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { SocketContextProvider } from "./context/SocketContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode> {/* Here we are wrapping One Component layer to the another: First We install react-router-dom that's why we wrap <App /> component inside the -> BrowserRouter to switch and refreshing the different pages continuously -> 2nd Wrap app component then inside the AuthContextProvider to check authentication and authorization -> 3rd wrap app component inside the SocketContextProvider so that socket data can be access at any time by the app component. */}
    <BrowserRouter>
      <AuthContextProvider> {/* After installing react-router-dom, for using this packages componets we have to wrap our main application inside the BrowserRoute component, so that our application pages can route to different routes on the pages. */}
        <SocketContextProvider>
          <App />
        </SocketContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>
);
