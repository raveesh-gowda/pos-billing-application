import React from "react";
import { useDispatch } from "react-redux";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import {
   clearOneData,
   startEditProduct,
} from "../../Redux/actions/productsActions";

const EditProduct = (props) => {
   const { _id, name, price, handleToggle } = props;

   const dispatch = useDispatch();

   const initialValues = {
      name: name,
      price: price,
   };

   const validate = Yup.object({
      name: Yup.string().min(5, "Too short").required("* required"),
      price: Yup.string().min(0, "Invalid Number").required("* required"),
   });

   const handleSubmit = (values, onSubmitProps) => {
      dispatch(startEditProduct(_id, values, handleToggle, onSubmitProps));
      dispatch(clearOneData());
   };

   return (
      <div>
         <h2>Update Product</h2>
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
                           className="btn btn-outline-primary text-white btn-sm"
                        >
                           Update
                        </button>
                     </div>
                  </Form>
               </div>
            )}
         </Formik>
      </div>
   );
};

export default EditProduct;
