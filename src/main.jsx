import React from "react";
import ReactDOM from "react-dom";
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "./auth-config";
import App from "./App";
import "./index.css"; // Import Tailwind CSS for styling

// Create an instance of PublicClientApplication with msalConfig
const msalInstance = new PublicClientApplication(msalConfig);

// If there are multiple accounts, set the first account as active
if (
  !msalInstance.getActiveAccount() &&
  msalInstance.getAllAccounts().length > 0
) {
  msalInstance.setActiveAccount(msalInstance.getAllAccounts()[0]);
}

// Add an event callback to handle login success events
msalInstance.addEventCallback((event) => {
  if (event.eventType === "loginSuccess" && event.payload.account) {
    const account = event.payload.account;
    msalInstance.setActiveAccount(account);
  }
});

// Render the App component wrapped in React.StrictMode
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App instance={msalInstance} />
  </React.StrictMode>
);
