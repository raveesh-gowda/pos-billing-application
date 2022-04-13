import React from "react";
import { useSelector } from "react-redux";

const Cart = (props) => {
   const { cart, handleDecrement, handleIncrement, handleRemove } = props;

   const { products } = useSelector((state) => state);

   const findName = (id) => {
      let name = "";
      products.data.find((ele) => {
         if (ele._id === id) {
            return (name = ele.name);
         }
      });
      return name;
   };

   const findPrice = (id) => {
      let price = "";
      products.data.find((ele) => {
         if (ele._id === id) {
            return (price = ele.price);
         }
      });
      return price;
   };

   const calcTotal = () => {
      let sum = 0;
      cart.forEach((item) => {
         sum += findPrice(item.product) * item.quantity;
      });
      return sum;
   };

   return (
      <div className="card border-dark" style={{ height: "28rem" }}>
         <h2 className="h2 card-header m-1">Cart - {cart.length}</h2>
         {cart.length === 0 ? (
            <h4 className="display-6 text-center">
               No items in the cart. Add the items
            </h4>
         ) : (
            <>
               <div
                  className="m-2"
                  style={{
                     position: "relative",
                     height: "22rem",
                     overflow: "auto",
                     display: "block",
                  }}
               >
                  <table className="table table-hover table-bordered text-center">
                     <thead>
                        <tr className="bg-primary">
                           <th>SlNo</th>
                           <th>Product</th>
                           <th>Quantity</th>
                           <th>Price</th>
                           <th>Action</th>
                        </tr>
                     </thead>
                     <tbody>
                        {cart.map((ele, i) => {
                           return (
                              <tr key={i} className="table-secondary">
                                 <td>{i + 1}</td>
                                 <td>{findName(ele.product)}</td>
                                 <td>
                                    <div className="d-flex justify-content-evenly">
                                       <button
                                          disabled={ele.quantity === 1}
                                          onClick={() => {
                                             handleDecrement(ele.product);
                                          }}
                                          className="btn btn-outline-danger btn-sm"
                                       >
                                          -
                                       </button>
                                       {ele.quantity}
                                       <button
                                          onClick={() => {
                                             handleIncrement(ele.product);
                                          }}
                                          className="btn btn-outline-warning btn-sm"
                                       >
                                          +
                                       </button>
                                    </div>
                                 </td>
                                 <td>
                                    {findPrice(ele.product) * ele.quantity}
                                 </td>
                                 <td>
                                    <button
                                       onClick={() => {
                                          handleRemove(ele.product);
                                       }}
                                       className="btn btn-outline-danger btn-sm"
                                    >
                                       Remove Item
                                    </button>
                                 </td>
                              </tr>
                           );
                        })}
                     </tbody>
                  </table>
               </div>
               <h3 className="h3 card-footer">Total - Rs.{calcTotal()}</h3>
            </>
         )}
      </div>
   );
};

export default Cart;
