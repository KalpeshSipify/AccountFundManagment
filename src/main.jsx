import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { InputProvider } from "../Context/InputContext.jsx";
import { BrowserRouter } from "react-router-dom";
import { Amplify } from "aws-amplify";
import config from "./aws-exports";
Amplify.configure(config);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <InputProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </InputProvider>
  </React.StrictMode>
);
