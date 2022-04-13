import React, { useState } from "react";
import { useSelector } from "react-redux";

import EditProduct from "./EditProduct";
import { sortFunction } from "../../selector/sorting";
import Pagination from "./Pagination";

const ListProducts = (props) => {
   const {
      toggle,
      handleToggle,
      term,
      handleTermChange,
      handleRemove,
      handleEdit,
      handleCancel,
   } = props;

   const { products } = useSelector((state) => state);

   const filteredProducts = products.data.filter((ele) => {
      return ele.name.toLowerCase().includes(term);
   });

   const [currentPage, setCurrentPage] = useState(1);
   const [productsPerPage] = useState(9);

   const indexOfLastProduct = currentPage * productsPerPage;
   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
   const currentProducts = sortFunction(filteredProducts).slice(
      indexOfFirstProduct,
      indexOfLastProduct
   );

   const paginate = (pageNumber) => {
      setCurrentPage(pageNumber);
   };

   return (
      <div>
         {toggle && Object.keys(products.oneData).length > 0 ? (
            <div>
               <EditProduct handleToggle={handleToggle} {...products.oneData} />
               <button
                  onClick={handleCancel}
                  className="btn btn-outline-warning text-white btn-sm"
               >
                  Cancel
               </button>
            </div>
         ) : (
            <div>
               {products.data.length === 0 ? (
                  <div>
                     <h2>No Products Added</h2>
                  </div>
               ) : (
                  <div>
                     <h2>
                        Listing Products - {currentProducts.length} of{" "}
                        {filteredProducts.length}{" "}
                     </h2>
                     <input
                        type="text"
                        placeholder="Search by product name"
                        value={term}
                        onChange={handleTermChange}
                        className="form form-control-md mt-2 mb-2 border-dark"
                        style={{ width: "18rem" }}
                     />
                     <div className="m-2">
                        <table className="table table-bordered table-striped text-center">
                           <thead>
                              <tr className="table-success">
                                 <th>SlNo</th>
                                 <th>Name</th>
                                 <th>Price (in Rs)</th>
                                 <th>Actions</th>
                              </tr>
                           </thead>
                           <tbody>
                              {sortFunction(currentProducts).map(
                                 (products, i) => {
                                    return (
                                       <tr
                                          key={products._id}
                                          className="table-secondary"
                                       >
                                          <td>{i + 1}</td>
                                          <td>{products.name}</td>
                                          <td>{products.price}</td>
                                          <td>
                                             <div className="d-flex justify-content-evenly">
                                                <button
                                                   onClick={() => {
                                                      handleEdit(products._id);
                                                   }}
                                                   className="btn btn-outline-success btn-sm"
                                                >
                                                   Update
                                                </button>
                                                <button
                                                   onClick={() => {
                                                      handleRemove(
                                                         products._id
                                                      );
                                                   }}
                                                   className="btn btn-outline-danger btn-sm"
                                                >
                                                   Remove
                                                </button>
                                             </div>
                                          </td>
                                       </tr>
                                    );
                                 }
                              )}
                           </tbody>
                        </table>
                        <Pagination
                           productsPerPage={productsPerPage}
                           totalProducts={filteredProducts.length}
                           paginate={paginate}
                        />
                     </div>
                  </div>
               )}
            </div>
         )}
      </div>
   );
};

export default ListProducts;
