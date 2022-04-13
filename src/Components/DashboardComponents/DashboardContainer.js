import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { startGetCustomers } from "../../Redux/actions/customersActions";
import { startGetProducts } from "../../Redux/actions/productsActions";
import { startGetBills } from "../../Redux/actions/billsActions";
import Statistics from "./Statistics";
import RecentFive from "./RecentFive";
import Charts from "./Charts";

const DashboardContainer = (props) => {
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(startGetCustomers());
      dispatch(startGetProducts());
      dispatch(startGetBills());
   }, [dispatch]);

   return (
      <div>
         <Statistics />
         <RecentFive />
         <Charts />
      </div>
   );
};

export default DashboardContainer;
