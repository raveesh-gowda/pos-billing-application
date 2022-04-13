import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";

import { startLoginUser } from "../../Redux/actions/userActions";

const Login = (props) => {
   const { handleAuth } = props;

   const initialValues = {
      email: "",
      password: "",
   };

   const validate = Yup.object({
      email: Yup.string().email("Invalid Email").required("* Email Required"),
      password: Yup.string()
         .min(6, "Password is too short,should be minimum 6 characters")
         .required("* Password Required"),
   });

   const dispatch = useDispatch();

   const handleSubmit = (values, onSubmitProps) => {
      //console.log(values)
      dispatch(startLoginUser(values, handleAuth, props, onSubmitProps));
   };

   return (
      <div
         className="container mt-4 card border-dark shadow-lg"
         style={{ width: "48rem" }}
      >
         <h3 className="h2 text-center">User Login Form</h3>
         <Formik
            initialValues={initialValues}
            validationSchema={validate}
            onSubmit={handleSubmit}
         >
            {(formik) => (
               <Form className="form form-control mb-3">
                  <label className="form-label">Email</label>
                  <br />
                  <Field
                     type="email"
                     name="email"
                     value={formik.values.email}
                     onChange={formik.handleChange}
                     onBlur={formik.handleBlur}
                     placeholder="ramachandra@gmail.com"
                     className="form-control"
                  />
                  {formik.errors.email && formik.touched.email && (
                     <span style={{ color: "red" }}>{formik.errors.email}</span>
                  )}{" "}
                  <br />
                  <label className="form-label">Password</label>
                  <br />
                  <Field
                     type="password"
                     name="password"
                     value={formik.values.password}
                     onChange={formik.handleChange}
                     onBlur={formik.handleBlur}
                     placeholder="*************"
                     className="form-control"
                  />
                  {formik.errors.password && formik.touched.password && (
                     <span style={{ color: "red" }}>
                        {formik.errors.password}
                     </span>
                  )}{" "}
                  <br />
                  <div className="d-flex justify-content-evenly">
                     <button
                        type="submit"
                        className="btn btn-success"
                        style={{ borderRadius: "35px" }}
                     >
                        Login
                     </button>
                     <p className="lead">
                        Don't have an account? <a href="/register">Sign Up</a>{" "}
                     </p>
                  </div>
               </Form>
            )}
         </Formik>
      </div>
   );
};

export default Login;
