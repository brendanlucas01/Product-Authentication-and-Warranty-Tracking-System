import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import {MoralisProvider} from "react-moralis";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import "remixicon/fonts/remixicon.css";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <MoralisProvider initializeOnMount={false} >
      <App />
      </MoralisProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
