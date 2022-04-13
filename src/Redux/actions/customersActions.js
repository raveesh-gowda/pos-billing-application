import axios from "../../config/axios";
import swal from "sweetalert";
import { header } from "../../config/header";

export const startGetCustomers = () => {
   return (dispatch) => {
      axios
         .get("/customers", { headers: header })
         .then((response) => {
            dispatch(getCustomers(response.data));
            dispatch(toggleLoading());
         })
         .catch((err) => {
            swal(err.message);
         });
   };
};

export const getCustomers = (data) => {
   return {
      type: "GET_CUSTOMERS",
      payload: data,
   };
};

export const toggleLoading = () => {
   return {
      type: "TOGGLE_LOADING",
   };
};

export const startAddCustomers = (values) => {
   return (dispatch) => {
      axios
         .post("/customers", values, { headers: header })
         .then((response) => {
            // console.log(response.data)
            dispatch(addCustomer(response.data));
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

export const addCustomer = (data) => {
   return {
      type: "ADD_CUSTOMER",
      payload: data,
   };
};

export const startGetOneCustomer = (customer) => {
   return (dispatch) => {
      axios
         .get(`/customers/${customer._id}`, { headers: header })
         .then((response) => {
            // console.log(response.data);
            dispatch(getOneCustomer(response.data));
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

export const getOneCustomer = (data) => {
   return {
      type: "ONE_CUSTOMER",
      payload: data,
   };
};

export const startEditCustomer = (_id, values) => {
   return (dispatch) => {
      axios
         .put(`/customers/${_id}`, values, { headers: header })
         .then((response) => {
            dispatch(editCustomer(response.data));
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

export const editCustomer = (data) => {
   return {
      type: "EDIT_CUSTOMER",
      payload: data,
   };
};

export const clearOneData = () => {
   return {
      type: "CLEAR_ONE_DATA",
   };
};

export const startDeleteCustomer = (id) => {
   return (dispatch) => {
      axios
         .delete(`/customers/${id}`, { headers: header })
         .then((response) => {
            dispatch(deleteCustomer(response.data));
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

export const deleteCustomer = (data) => {
   return {
      type: "DELETE_CUSTOMER",
      payload: data,
   };
};
