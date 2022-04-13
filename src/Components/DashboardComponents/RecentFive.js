import React from "react";
import { useSelector } from "react-redux";

const RecentFive = (props) => {
   const { customers, products, bills } = useSelector((state) => state);

   const lastFiveCustomers = customers.data.slice(-5).reverse();
   const lastFiveProducts = products.data.slice(-5).reverse();
   const lastFiveBills = bills.data.slice(-5).reverse();

   const findCustomer = (id) => {
      let custName = "";
      customers.data.find((ele) => {
         if (ele._id === id) {
            return (custName = ele.name);
         }
      });
      return custName;
   };

   return (
      <div className="m-2">
         <h1>Last Five Sales</h1>
         <div className="d-flex justify-content-evenly">
            <div className="card border-dark" style={{ width: "36rem" }}>
               <h3 className="card-header">Customers</h3>
               <table className="table table-bordered text-center">
                  <thead>
                     <tr className="table-info">
                        <th>SlNo</th>
                        <th>Name</th>
                        <th>Mobile</th>
                     </tr>
                  </thead>
                  <tbody>
                     {lastFiveCustomers.map((ele, i) => {
                        return (
                           <tr key={i} className="table-warning">
                              <td>{i + 1}</td>
                              <td>{ele.name}</td>
                              <td>{ele.mobile}</td>
                           </tr>
                        );
                     })}
                  </tbody>
               </table>
            </div>
            <div className="card border-dark" style={{ width: "36rem" }}>
               <h3 className="card-header">Products</h3>
               <table className="table table-bordered text-center">
                  <thead>
                     <tr className="table-info">
                        <th>SlNo</th>
                        <th>Name</th>
                        <th>Price (in Rs)</th>
                     </tr>
                  </thead>
                  <tbody>
                     {lastFiveProducts.map((ele, i) => {
                        return (
                           <tr key={i} className="table-warning">
                              <td>{i + 1}</td>
                              <td>{ele.name}</td>
                              <td>{ele.price}</td>
                           </tr>
                        );
                     })}
                  </tbody>
               </table>
            </div>
            <div className="card border-dark" style={{ width: "36rem" }}>
               <h3 className="card-header">Bills</h3>
               <table className="table table-bordered text-center">
                  <thead>
                     <tr className="table-info">
                        <th>SlNo</th>
                        <th>Name</th>
                        <th>Total (in Rs)</th>
                     </tr>
                  </thead>
                  <tbody>
                     {lastFiveBills.map((ele, i) => {
                        return (
                           <tr key={i} className="table-warning">
                              <td>{i + 1}</td>
                              <td>{findCustomer(ele.customer)}</td>
                              <td>{ele.total}</td>
                           </tr>
                        );
                     })}
                  </tbody>
               </table>
            </div>
         </div>
      </div>
   );
};

export default RecentFive;
