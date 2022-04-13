import React from "react";
import { useSelector } from "react-redux";

const Statistics = (props) => {
   const { customers, products, bills } = useSelector((state) => state);
   // console.log(bills.data);

   const revenue = bills.data.reduce((prevVal, curVal) => {
      return prevVal + curVal.total;
   }, 0);

   return (
      <div className="m-2">
         <h1>Statistics</h1>
         <div className="d-flex justify-content-between">
            <div
               className="card text-white bg-secondary border-dark m-2"
               style={{
                  transform: "scale(1.05)",
                  boxShadow:
                     "0 10px 20px rgba(0,0,0,.12), 0 4px 8px rgba(0,0,0,.06)",
               }}
            >
               <h5 className="card-title m-2 display-4">Total Customers</h5>
               <p className="card-body text-center mb-0 display-3">
                  {customers.data.length}
               </p>
            </div>
            <div
               className="card text-white bg-secondary border-dark m-2"
               style={{
                  transform: "scale(1.05)",
                  boxShadow:
                     "0 10px 20px rgba(0,0,0,.12), 0 4px 8px rgba(0,0,0,.06)",
               }}
            >
               <h5 className="card-title m-2 display-4">Total Product</h5>
               <p className="card-body text-center mb-0 display-3">
                  {products.data.length}
               </p>
            </div>
            <div
               className="card text-white bg-secondary border-dark m-2"
               style={{
                  transform: "scale(1.05)",
                  boxShadow:
                     "0 10px 20px rgba(0,0,0,.12), 0 4px 8px rgba(0,0,0,.06)",
               }}
            >
               <h5 className="card-title m-2 display-4">Total Bills</h5>
               <p className="card-body text-center mb-0 display-3">
                  {bills.data.length}
               </p>
            </div>
            <div
               className="card text-white bg-secondary border-dark m-2"
               style={{
                  transform: "scale(1.05)",
                  boxShadow:
                     "0 10px 20px rgba(0,0,0,.12), 0 4px 8px rgba(0,0,0,.06)",
               }}
            >
               <h5 className="card-title m-2 display-4">
                  Total Revenue
               </h5>
               <p className="card-body text-center mb-0 display-3">Rs. {revenue}</p>
            </div>
         </div>
      </div>
   );
};

export default Statistics;
