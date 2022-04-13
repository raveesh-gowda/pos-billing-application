import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";

import { startAddProducts } from "../../Redux/actions/productsActions";

const ProductForm = (props) => {
   const initialValues = {
      name: "",
      price: "",
   };

   const validate = Yup.object({
      name: Yup.string().min(3, "Too short").required("* required"),
      price: Yup.string().min(0, "Invalid Number").required("* required"),
   });

   const dispatch = useDispatch();

   const handleSubmit = (values, onSubmitProps) => {
      dispatch(startAddProducts(values));
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
                           placeholder="Name"
                           className="border-dark"
                        />
                        {formik.errors.name && formik.touched.name && (
                           <span style={{ color: "red" }}>
                              {formik.errors.name}
                           </span>
                        )}{" "}
                        <Field
                           type="price"
                           name="price"
                           value={formik.values.price}
                           onChange={formik.handleChange}
                           onBlur={formik.handleBlur}
                           placeholder="price"
                           className="border-dark"
                        />
                        {formik.errors.price && formik.touched.price && (
                           <span style={{ color: "red" }}>
                              {formik.errors.price}
                           </span>
                        )}{" "}
                        <button
                           type="submit"
                           className="btn btn-outline-dark btn-sm"
                        >
                           Add Product
                        </button>
                     </div>
                  </Form>
               </div>
            )}
         </Formik>
      </div>
   );
};

export default ProductForm;
