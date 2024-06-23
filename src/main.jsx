import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "./auth-config.js";

const msalInstance = new PublicClientApplication(msalConfig);
if (
  !msalInstance.getActiveAccount() &&
  msalInstance.getAllAccounts().length > 0
) {
  msalInstance.setActiveAccount(msalInstance.getActiveAccount()[0]);
}

msalInstance.addEventCallback((event) => {
  if (
    event.eventType === event.eventType.LOGIN_SUCCESS &&
    event.payload.account
  ) {
    const account = event.payload.account;
    msalInstance.setActiveAccount(account);
  }
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App instance={msalInstance} />
  </React.StrictMode>
);
