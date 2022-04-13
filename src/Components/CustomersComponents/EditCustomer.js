import React from "react";
import { useDispatch } from "react-redux";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import {
   startEditCustomer,
   clearOneData,
} from "../../Redux/actions/customersActions";

const EditCustomer = (props) => {
   const { _id, name, mobile, email, handleToggle } = props;
   // console.log(props);

   const dispatch = useDispatch();

   const initialValues = {
      name: name,
      mobile: mobile,
      email: email,
   };

   const validate = Yup.object({
      name: Yup.string().min(5, "Too short").required("* required"),
      mobile: Yup.string().min(6, "Invalid Number").required("* required"),
      email: Yup.string().email("Invalid Email").required("* required"),
   });

   const handleSubmit = (values, onSubmitProps) => {
      dispatch(startEditCustomer(_id, values));
      dispatch(clearOneData());
      onSubmitProps.resetForm();
      handleToggle();
   };

   return (
      <div>
         <h2>Update Customer</h2>
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
                           placeholder="Name"
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
                        />
                        {formik.errors.email && formik.touched.email && (
                           <span style={{ color: "red" }}>
                              {formik.errors.email}
                           </span>
                        )}{" "}
                        <button
                           type="submit"
                           className="btn btn-outline-primary text-white btn-sm"
                        >
                           Update Customer
                        </button>
                     </div>
                  </Form>
               </div>
            )}
         </Formik>
      </div>
   );
};

export default EditCustomer;
