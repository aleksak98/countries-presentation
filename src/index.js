import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./public/fonts/font.css";
import "./public/styles/global.css";
import "./public/styles/header.css";
import "./public/styles/home.css";
import "./public/styles/country.css";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
reportWebVitals();
