import swal from "sweetalert";
import axios from "../../config/axios";
import { header } from "../../config/header";

export const startGetBills = () => {
   return (dispatch) => {
      axios
         .get("/bills", { headers: header })
         .then((response) => {
            // console.log(response.data);
            dispatch(getBills(response.data));
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

export const getBills = (data) => {
   return {
      type: "GET_BILLS",
      payload: data,
   };
};

export const startPostBills = (data) => {
   return (dispatch) => {
      axios
         .post("/bills", data, { headers: header })
         .then((response) => {
            dispatch(postBills(response.data));
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

export const postBills = (data) => {
   return {
      type: "POST_BILLS",
      payload: data,
   };
};

export const startDeleteBill = (id) => {
   return (dispatch) => {
      axios
         .delete(`/bills/${id}`, { headers: header })
         .then((response) => {
            dispatch(deleteBill(response.data));
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

export const deleteBill = (data) => {
   return {
      type: "DELETE_BILL",
      payload: data,
   };
};
