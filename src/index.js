import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import configureStore from "./Redux/store/configureStore";
import "bootstrap/dist/css/bootstrap.min.css"

const store = configureStore();

ReactDOM.render(
   <BrowserRouter>
      <Provider store={store}>
         <App />
      </Provider>
   </BrowserRouter>,
   document.getElementById("root")
);
