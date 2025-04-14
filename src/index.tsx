import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./ThemeContext";
import "./global.css";
import 'bootstrap/dist/css/bootstrap.css';
import ReactGA from "react-ga4";
// Put any other imports below so that CSS from your
// components takes precedence over default styles.

const container = document.getElementById("root");
const root = createRoot(container!);
ReactGA.initialize("G-ZFZ23FW3YD");

root.render(
  <BrowserRouter>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
