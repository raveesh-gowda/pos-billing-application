import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { startGetBills } from "../../Redux/actions/billsActions";
import { startGetCustomers } from "../../Redux/actions/customersActions";
import { startGetProducts } from "../../Redux/actions/productsActions";
import AddBill from "./AddBill";
import ListBills from "./ListBills";

const BillingContainer = (props) => {
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(startGetCustomers());
      dispatch(startGetProducts());
      dispatch(startGetBills());
   }, [dispatch]);

   return (
      <div className="m-2">
         <h1>Billing Page</h1>
         <AddBill />
         <ListBills />
      </div>
   );
};

export default BillingContainer;
