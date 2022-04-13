import React, { useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";

import { startAddCustomers, startGetCustomers } from "../../Redux/actions/customersActions";

const CustomersForm = (props) => {
   const initialValues = {
      name: "",
      mobile: "",
      email: "",
   };

   const validate = Yup.object({
      name: Yup.string().min(5, "Too short").required("* required"),
      mobile: Yup.string().min(10, "Invalid Number").required("* required"),
      email: Yup.string().email("Invalid Email").required("* required"),
   });

   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(startGetCustomers())
   }, [dispatch])

   const handleSubmit = (values, onSubmitProps) => {
      // console.log(values)
      dispatch(startAddCustomers(values));
      onSubmitProps.resetForm();
   };

   return (
      <div className="mb-3">
         <Formik
            initialValues={initialValues}
            validationSchema={validate}
            onSubmit={handleSubmit}
         >
            {(formik) => (
               <div>
                  <Form>
                     <div>
                        <Field
                           type="name"
                           name="name"
                           value={formik.values.name}
                           onChange={formik.handleChange}
                           onBlur={formik.handleBlur}
                           placeholder="Customer Name"
                           className="border-dark"
                        />
                        {formik.errors.name && formik.touched.name && (
                           <span style={{ color: "red" }}>
                              {formik.errors.name}
                           </span>
                        )}{" "}
                        <Field
                           type="mobile"
                           name="mobile"
                           value={formik.values.mobile}
                           onChange={formik.handleChange}
                           onBlur={formik.handleBlur}
                           placeholder="Mobile"
                           className="border-dark"
                        />
                        {formik.errors.mobile && formik.touched.mobile && (
                           <span style={{ color: "red" }}>
                              {formik.errors.mobile}
                           </span>
                        )}{" "}
                        <Field
                           type="email"
                           name="email"
                           value={formik.values.email}
                           onChange={formik.handleChange}
                           onBlur={formik.handleBlur}
                           placeholder="Email"
                           className="border-dark"
                        />
                        {formik.errors.email && formik.touched.email && (
                           <span style={{ color: "red" }}>
                              {formik.errors.email}
                           </span>
                        )}{" "}
                        <button
                           type="submit"
                           className="btn btn-outline-dark btn-sm"
                        >
                           Add Customer
                        </button>
                     </div>
                  </Form>
               </div>
            )}
         </Formik>
      </div>
   );
};

export default CustomersForm;
