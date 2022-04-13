import axios from "../../config/axios";
import swal from "sweetalert";
import { header } from "../../config/header";

export const startGetProducts = () => {
   return (dispatch) => {
      axios
         .get("/products", { headers: header })
         .then((response) => {
            dispatch(getProducts(response.data));
            dispatch(toggleLoading());
         })
         .catch((err) => {
             swal({
                title: `${err.message}`,
                icon: "error",
                button: "OK",
             });
         });
   };
};

export const getProducts = (data) => {
   return {
      type: "GET_PRODUCTS",
      payload: data,
   };
};

export const toggleLoading = () => {
   return {
      type: "TOGGLE_LOADING",
   };
};

export const startAddProducts = (values) => {
   return (dispatch) => {
      axios
         .post("/products", values, { headers: header })
         .then((response) => {
            dispatch(addProduct(response.data));
         })
         .catch((err) => {
             swal({
                title: `${err.message}`,
                icon: "error",
                button: "OK",
             });
         });
   };
};

export const addProduct = (data) => {
   return {
      type: "ADD_PRODUCT",
      payload: data,
   };
};

export const startGetOneProduct = (id) => {
   return (dispatch) => {
      axios
         .get(`/products/${id}`, { headers: header })
         .then((response) => {
            dispatch(getOneProduct(response.data));
         })
         .catch((err) => {
             swal({
                title: `${err.message}`,
                icon: "error",
                button: "OK",
             });
         });
   };
};

export const getOneProduct = (data) => {
   return {
      type: "ONE_PRODUCT",
      payload: data,
   };
};

export const startEditProduct = (_id, values, handleToggle, onSubmitProps) => {
   return (dispatch) => {
      axios
         .put(`/products/${_id}`, values, { headers: header })
         .then((response) => {
            dispatch(editProduct(response.data));
            handleToggle();
            onSubmitProps.resetForm();
         })
         .catch((err) => {
             swal({
                title: `${err.message}`,
                icon: "error",
                button: "OK",
             });
         });
   };
};

export const editProduct = (data) => {
   return {
      type: "EDIT_PRODUCT",
      payload: data,
   };
};

export const clearOneData = () => {
   return {
      type: "CLEAR_ONE_DATA",
   };
};

export const startDeleteProduct = (id) => {
   return (dispatch) => {
      axios
         .delete(`/products/${id}`, { headers: header })
         .then((response) => {
            dispatch(deleteProduct(response.data));
         })
         .catch((err) => {
             swal({
                title: `${err.message}`,
                icon: "error",
                button: "OK",
             });
         });
   };
};

export const deleteProduct = (data) => {
   return {
      type: "DELETE_PRODUCT",
      payload: data,
   };
};
