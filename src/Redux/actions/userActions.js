import axios from "../../config/axios";
import swal from "sweetalert";
import { header } from "../../config/header";

export const startRegisterUser = (values) => {
   return (dispatch) => {
      axios
         .post("/users/register", values)
         .then((response) => {
            //console.log(response.data)
            if (response.data.hasOwnProperty("errors")) {
               swal(response.data.errors);
            } else {
               swal({
                  title: "Registered Succesfully!",
                  icon: "success",
                  button: "OK",
               });
               dispatch(setRegisterUser(response.data));
            }
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

export const setRegisterUser = (data) => {
   return {
      type: "REGISTER_USER",
      payload: data,
   };
};

export const startLoginUser = (values, handleAuth, props, onSubmitProps) => {
   return (dispatch) => {
      axios
         .post("/users/login", values)
         .then((response) => {
            // console.log(response.data);
            if (response.data.hasOwnProperty("errors")) {
               swal(response.data.errors, {
                  icon: "error",
               });
            } else {
               dispatch(setLoginUser(response.data));
               handleAuth();
               localStorage.setItem("token", response.data.token);
               props.history.push("/");
               onSubmitProps.resetForm();
               window.location.reload(); //to check if reloaded the page is back to home, register & log in
            }
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

export const setLoginUser = (data) => {
   return {
      type: "LOGIN_USER",
      payload: data,
   };
};

export const startGetUserInfo = () => {
   return (dispatch) => {
      axios
         .get("/users/account", {
            headers: header,
         })
         .then((response) => {
            //  console.log(response.data);
            dispatch(userInfo(response.data));
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

export const userInfo = (data) => {
   return {
      type: "USER_INFO",
      payload: data,
   };
};

export const userLogout = () => {
   return {
      type: "USER_LOGOUT",
   };
};
