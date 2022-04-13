import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { startRegisterUser } from "../../Redux/actions/userActions";
import swal from "sweetalert";

const Register = (props) => {
   const [registered, setRegistered] = useState(false);

   useEffect(() => {
      if (registered) {
         props.history.push("/login");
      }
   }, [props.history, registered]);

   const initialValues = {
      username: "",
      email: "",
      password: "",
      businessName: "",
      address: "",
   };

   const validateForm = () => {
      const validate = Yup.object({
         username: Yup.string()
            .min(5, "Too short")
            .required("Name is required"),
         email: Yup.string()
            .email("Invalid Email")
            .required("Email is required"),
         password: Yup.string()
            .min(6, "Password should be minimum 6 characters")
            .required("Password is required"),
      });
      return validate;
   };

   const dispatch = useDispatch();

   const handleSubmit = (values, onSubmitProps) => {
      //    console.log(values);
      swal({
         title: "Successfully Registered",
         icon: "success",
      });
      dispatch(startRegisterUser(values));
      setRegistered(true);
      onSubmitProps.resetForm();
   };

   return (
      <div
         className="container card mt-4 border-dark shadow-lg"
         style={{ width: "48rem" }}
      >
         <h3 className="h2 text-center m-3">User Registration Form</h3>
         <Formik
            initialValues={initialValues}
            validationSchema={validateForm()}
            onSubmit={handleSubmit}
         >
            {(formik) => (
               <Form
                  className="form form-control mb-2"
                  style={{ width: "46rem" }}
               >
                  <label className="form-label">Name</label>
                  <br />
                  <Field
                     type="text"
                     name="username"
                     value={formik.values.username}
                     onChange={formik.handleChange}
                     onBlur={formik.handleBlur}
                     placeholder="Ramachandra Babu"
                     className="form-control"
                  />
                  {formik.touched.username && formik.errors.username && (
                     <span style={{ color: "red" }}>
                        {formik.errors.username}
                     </span>
                  )}{" "}
                  <br />
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
                     placeholder="*********"
                     className="form-control"
                  />
                  {formik.errors.password && formik.touched.password && (
                     <span style={{ color: "red" }}>
                        {formik.errors.password}
                     </span>
                  )}{" "}
                  <br />
                  <label className="form-label">Business Name</label>
                  <br />
                  <Field
                     type="text"
                     name="businessName"
                     value={formik.values.businessName}
                     placeholder="Marketing"
                     className="form-control"
                  />
                  <br />
                  <label className="form-label">Address</label>
                  <br />
                  <Field
                     as="textarea"
                     type="text"
                     name="address"
                     value={formik.values.address}
                     placeholder="Ramachandra Babu,
                                          P.O. Box 597 JP Nagar,
                                          Bengaluru 560029,
                                         +91 9986998699"
                     className="form-control"
                     rows="4"
                  />
                  <br />
                  <div className="d-flex justify-content-evenly">
                     <input
                        type="submit"
                        className="btn btn-outline-dark btn-sm"
                        style={{ borderRadius: "35px" }}
                        value="Register Now"
                     />
                     <p className="lead">
                        Already have an account? <a href="/login">Log in</a>{" "}
                     </p>
                  </div>
               </Form>
            )}
         </Formik>
      </div>
   );
};

export default Register;
