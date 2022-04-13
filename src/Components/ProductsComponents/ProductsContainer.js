import React, { useState,useEffect } from "react";
import { useDispatch } from "react-redux";
import swal from "sweetalert";

import {
   startGetProducts,
   startDeleteProduct,
   startGetOneProduct,
   clearOneData,
} from "../../Redux/actions/productsActions";
import ProductForm from "./ProductForm";
import ListProducts from "./ListProducts";

const ProductsContainer = (props) => {   
   const [toggle, setToggle] = useState(false);
   const [term, setTerm] = useState("");

   const handleTermChange = (e) => {
      setTerm(e.target.value);
   };

   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(startGetProducts());
   }, [dispatch]);

   const handleRemove = (id) => {
      swal({
         title: "Are you sure?",
         text: "Do you want to Delete this products Data?",
         icon: "warning",
         buttons: [true, "Yes"],
         dangerMode: true,
      }).then((willDelete) => {
         if (willDelete) {
            dispatch(startDeleteProduct(id));
            swal("Product Deleted Successfully!", "", {
               icon: "success",
            });
         } else {
            swal("Product data is safe!", "", "info");
         }
      });
   };

   const handleToggle = () => {
      setToggle(!toggle);
   };

   const handleCancel = () => {
      dispatch(clearOneData());
      handleToggle();
   };

   const handleEdit = (id) => {
      handleToggle();
      dispatch(startGetOneProduct(id));
   };

   return (
      <div className="m-2">
         <h1>Products Page</h1>
         <h2 className="h2">Add Products</h2>
         <ProductForm />
         <ListProducts
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

export default ProductsContainer;
