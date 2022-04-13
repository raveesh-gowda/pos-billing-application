import React, { useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { startGetBills } from "../../Redux/actions/billsActions";
import { startGetCustomers } from "../../Redux/actions/customersActions";
import { startGetProducts } from "../../Redux/actions/productsActions";

const BillDetails = (props) => {
   const { id } = props.match.params;
   //    console.log(id);
   const { state } = props.location;
   //    console.log(state);

   const { customers, products } = useSelector((state) => state);

   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(startGetCustomers());
      dispatch(startGetProducts());
      dispatch(startGetBills());
   }, [dispatch]);

   const findName = (id) => {
      let custName = "";
      customers.data.find((ele) => {
         if (ele._id === id) {
            return (custName = ele.name);
         }
      });
      return custName;
   };

   const findMobile = (id) => {
      let custMobile = "";
      customers.data.find((ele) => {
         if (ele._id === id) {
            return (custMobile = ele.mobile);
         }
      });
      return custMobile;
   };

   const findEmail = (id) => {
      let custEmail = "";
      customers.data.find((ele) => {
         if (ele._id === id) {
            return (custEmail = ele.email);
         }
      });
      return custEmail;
   };

   const findProduct = (id) => {
      let name = "";
      products.data.find((ele) => {
         if (ele._id === id) {
            return (name = ele.name);
         }
      });
      return name;
   };

   const invoiceRef = useRef();
   const invoiceStyle = `
        @page {
            margin-top: 30mm
        }`;

   const handlePrint = useReactToPrint({
      content: () => invoiceRef.current,
      pageStyle: invoiceStyle,
   });

   return (
      <div>
         <div ref={invoiceRef} className="card m-3" style={{ width: "98%" }}>
            <h1 className="card-header">Bill ID: {id}</h1>
            <div className="card-title m-2">
               <h3 className="display-5">Customer Details</h3>
               <p className="lead">Customer Name: {findName(state.customer)}</p>
               <p className="lead">
                  Customer Mobile: {findMobile(state.customer)}
               </p>
               <p className="lead">
                  Customer Email: {findEmail(state.customer)}
               </p>
            </div>
            <div className="card-body">
               <h3 className="display-5">Product Details</h3>
               <table className="table table-bordered table-hover text-center">
                  <thead>
                     <tr className="table-primary">
                        <th>SlNo</th>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Price (in Rs)</th>
                     </tr>
                  </thead>
                  <tbody>
                     {state.lineItems.map((ele, i) => {
                        return (
                           <tr key={i} className="table-secondary">
                              <td>{i + 1}</td>
                              <td>{findProduct(ele.product)}</td>
                              <td>{ele.quantity}</td>
                              <td>{ele.subTotal}</td>
                           </tr>
                        );
                     })}
                  </tbody>
               </table>
            </div>
            <h3 className="card-footer">Total - Rs.{state.total}</h3>
         </div>
         <div className="d-flex justify-content-evenly">
            <button className="btn btn-outline-success" onClick={handlePrint}>
               Print
            </button>
            <button className="btn btn-outline-dark">
               <Link to="/billing">Back</Link>
            </button>
         </div>
      </div>
   );
};

export default BillDetails;
