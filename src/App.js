import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import "./App.css";
import NavBar from "./Components/NavBar";
import { startGetCustomers } from "./Redux/actions/customersActions";
import { startGetProducts } from "./Redux/actions/productsActions";
import { startGetBills } from "./Redux/actions/billsActions";

const App = (props) => {
   const [userLoggedIn, setUserLoggedIn] = useState(false);

   const handleAuth = () => {
      setUserLoggedIn(!userLoggedIn);
   };

   const dispatch = useDispatch();

   useEffect(() => {
      if (localStorage.getItem("token")) {
         handleAuth();
         dispatch(startGetCustomers());
         dispatch(startGetProducts());
         dispatch(startGetBills());
      }
   }, []);

   return (
      <div>
         <h1 className="display-2">ABC Billing Application</h1>
         <NavBar userLoggedIn={userLoggedIn} handleAuth={handleAuth} />
      </div>
   );
};

export default App;
