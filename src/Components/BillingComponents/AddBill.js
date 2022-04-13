import React, { useState } from "react";
// import Select from "react-select";
import { useSelector, useDispatch } from "react-redux";
import swal from "sweetalert";

import { startPostBills } from "../../Redux/actions/billsActions";
import { sortFunction } from "../../selector/sorting";
import Cart from "./Cart";

const AddBill = (props) => {
   const [date, setDate] = useState("");
   const [product, setProduct] = useState("");
   const [customer, setCustomer] = useState("");
   const [quantity, setQuantity] = useState(1);
   const [formErrors, setFormErrors] = useState({});
   const errors = {};
   const [cart, setCart] = useState([]);

   const { customers, products } = useSelector((state) => state);

   const runValidations = () => {
      if (date.trim().length === 0) {
         errors.date = "*Date cannot be blank";
      }
   };

   const handleDateChange = (e) => {
      setDate(e.target.value);
   };

   const handleCustomerChange = (e) => {
      setCustomer(e.target.value);
   };

   const handleProductChange = (e) => {
      setProduct(e.target.value);
   };

   const handleQuantityChange = (e) => {
      setQuantity(e.target.value);
   };

   const resetForm = () => {
      setDate("");
      setCustomer("");
      setProduct("");
      setQuantity(1);
      setCart([]);
   };

   const dispatch = useDispatch();

   const handleSubmit = (e) => {
      e.preventDefault();
      runValidations();
      if (Object.keys(errors).length === 0) {
         setFormErrors({});
         const formData = {
            date,
            customer,
            lineItems: cart,
         };
         //  console.log(formData);
         dispatch(startPostBills(formData));
         resetForm();
      } else {
         setFormErrors(errors);
      }
   };

   const handleCart = (e) => {
      e.preventDefault();
      runValidations();
      if (Object.keys(errors).length === 0) {
         setFormErrors({});
         setCart([{ product, quantity }, ...cart]);
      } else {
         setFormErrors(errors);
      }
   };

   const handleDecrement = (id) => {
      const decrement = cart.map((item) => {
         if (item.product === id) {
            return { ...item, ...{ quantity: item.quantity - 1 } };
         } else {
            return { ...item };
         }
      });
      setCart(decrement);
   };

   const handleIncrement = (id) => {
      const increment = cart.map((item) => {
         if (item.product === id) {
            return { ...item, ...{ quantity: item.quantity + 1 } };
         } else {
            return { ...item };
         }
      });
      setCart(increment);
   };

   const handleRemove = (id) => {
      swal({
         title: "Are you sure?",
         text: "Remove this Item from Cart?",
         icon: "warning",
         buttons: [true, "Yes"],
         dangerMode: true,
      }).then((willDelete) => {
         if (willDelete) {
            const result = cart.filter((ele) => {
               return ele.product !== id;
            });
            setCart(result);
            swal("Item Removed Successfully!", "", {
               icon: "success",
            });
         }
      });
   };

   const handleClear = (e) => {
      e.preventDefault();
      resetForm();
   };

   return (
      <div className="row m-3">
         <div className="col-md-4">
            <form
               className="form bg-dark text-white form-control border-dark"
               style={{ width: "35rem", height: "28rem" }}
            >
               <h2 className="h2">Add Bill</h2>
               <label className="form-label">Date</label>
               <br />
               <input
                  type="date"
                  name="date"
                  value={date}
                  onChange={handleDateChange}
                  className="form-control-md"
               />
               {formErrors.date && (
                  <span style={{ color: "red" }}>{formErrors.date}</span>
               )}
               <br />
               <label className="form-label">Select a customer</label>
               <br />
               {/* <Select
                  options={customersOptions}
                  onChange={handleCustomerChange}
                  className="form-control-md text-dark"
               /> */}
               <select
                  className="form-select form-select-sm"
                  value={customer}
                  onChange={handleCustomerChange}
               >
                  <option value="">---Select customer---</option>
                  {sortFunction(customers.data).map((ele) => {
                     return (
                        <option key={ele._id} value={ele._id}>
                           {ele.name}
                        </option>
                     );
                  })}
               </select>
               <br />
               <label className="form-label">Select products</label>
               <br />
               {/* <Select
                  options={productsOptions}
                  onChange={handleProductChange}
                  className="form-control-sm text-dark"
               /> */}
               <select
                  className="form-select form-select-sm"
                  value={product}
                  onChange={handleProductChange}
               >
                  <option value="">---Select product---</option>
                  {sortFunction(products.data).map((ele) => {
                     return (
                        <option key={ele._id} value={ele._id}>
                           {ele.name}
                        </option>
                     );
                  })}
               </select>
               <br />
               <label className="form-label">Quantity</label>
               <br />
               <input
                  type="number"
                  name="quantity"
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="form-control-md mb-3"
               />
               <br />
               <button
                  onClick={handleCart}
                  className="btn btn-outline-primary btn-sm me-3"
               >
                  Add to cart
               </button>
               <button
                  disabled={cart.length === 0}
                  onClick={handleSubmit}
                  className="btn btn-outline-success btn-sm me-3"
               >
                  Submit
               </button>
               <button
                  disabled={cart.length === 0}
                  onClick={handleClear}
                  className="btn btn-outline-danger btn-sm me-3"
               >
                  Clear Cart
               </button>
            </form>
         </div>
         <div className="col-md-8">
            <Cart
               cart={cart}
               handleDecrement={handleDecrement}
               handleIncrement={handleIncrement}
               handleRemove={handleRemove}
            />
         </div>
      </div>
   );
};

export default AddBill;
