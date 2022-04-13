import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import swal from "sweetalert";

import {
   startGetCustomers,
   startDeleteCustomer,
   startGetOneCustomer,
   clearOneData,
} from "../../Redux/actions/customersActions";
import CustomersForm from "./CustomersForm";
import ListCustomers from "./ListCustomers";

const CustomerContainer = (props) => {
   const [toggle, setToggle] = useState(false);
   const [term, setTerm] = useState("");

   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(startGetCustomers());
   }, [dispatch]);

   const handleTermChange = (e) => {
      setTerm(e.target.value);
   };

   const handleRemove = (id) => {
      swal({
         title: "Are you sure?",
         text: "Do you want to Delete this Customer Data?",
         icon: "warning",
         buttons: [true, "Yes"],
         dangerMode: true,
      }).then((willDelete) => {
         if (willDelete) {
            dispatch(startDeleteCustomer(id));
            swal("Customer Deleted Successfully!", "", {
               icon: "success",
            });
         } else {
            swal("Customer data is safe!", "", "info");
         }
      });
   };

   const handleToggle = () => {
      setToggle(!toggle);
   };

   const handleCancel = () => {
      handleToggle();
      dispatch(clearOneData());
   };

   const handleEdit = (customer) => {
      dispatch(startGetOneCustomer(customer));
      handleToggle();
   };

   return (
      <div className="m-2">
         <h2 className="h2">Add Customer</h2>
         <CustomersForm />
         <ListCustomers
            toggle={toggle}
            term={term}
            handleTermChange={handleTermChange}
            handleRemove={handleRemove}
            handleEdit={handleEdit}
            handleCancel={handleCancel}
            handleToggle={handleToggle}
         />
      </div>
   );
};

export default CustomerContainer;
