import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AppProvider } from "./components/context/context";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AppProvider>
    <App />
  </AppProvider>
);
// putting AppProvider out of <App /> that we can use
// all children variable in context.js as global variable

reportWebVitals();
