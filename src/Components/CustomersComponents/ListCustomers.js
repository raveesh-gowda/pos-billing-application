import React, { useState } from "react";
import { useSelector } from "react-redux";

import EditCustomer from "./EditCustomer";
import { sortFunction } from "../../selector/sorting";
import Pagination from "./Pagination";

const ListCustomers = (props) => {
   const {
      toggle,
      handleToggle,
      term,
      handleTermChange,
      handleRemove,
      handleEdit,
      handleCancel,
   } = props;

   const { customers } = useSelector((state) => state);

   const filteredCustomers = customers.data.filter((ele) => {
      return ele.name.toLowerCase().includes(term) || ele.mobile.includes(term);
   });

   const [currentPage, setCurrentPage] = useState(1);
   const [customersPerPage] = useState(9);

   const indexOfLastCustomer = currentPage * customersPerPage;
   const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
   const currentCustomers = sortFunction(filteredCustomers).slice(
      indexOfFirstCustomer,
      indexOfLastCustomer
   );

   const paginate = (pageNumber) => {
      setCurrentPage(pageNumber);
   };

   return (
      <div className="m-1">
         {toggle && Object.keys(customers.oneData).length > 0 ? (
            <div>
               <EditCustomer
                  handleToggle={handleToggle}
                  {...customers.oneData}
               />
               <button
                  onClick={handleCancel}
                  className="btn btn-outline-warning text-white btn-sm"
               >
                  Cancel
               </button>
            </div>
         ) : (
            <div>
               {customers.data.length === 0 ? (
                  <div>
                     <h2>No Customers Added</h2>
                  </div>
               ) : (
                  <div>
                     <h2>
                        Listing Customers - {currentCustomers.length} of{" "}
                        {filteredCustomers.length}
                     </h2>
                     <input
                        type="text"
                        placeholder="Search by name or number"
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
                                 <th>Mobile</th>
                                 <th>Email</th>
                                 <th>Actions</th>
                              </tr>
                           </thead>
                           <tbody>
                              {sortFunction(currentCustomers).map(
                                 (customer, i) => {
                                    return (
                                       <tr key={i} className="table-secondary">
                                          <td>{i + 1}</td>
                                          <td>{customer.name}</td>
                                          <td>{customer.mobile}</td>
                                          <td>{customer.email}</td>
                                          <td>
                                             <div className="d-flex justify-content-evenly">
                                                <button
                                                   onClick={() => {
                                                      handleEdit(customer);
                                                   }}
                                                   className="btn btn-outline-success btn-sm"
                                                >
                                                   Update
                                                </button>
                                                <button
                                                   onClick={() => {
                                                      handleRemove(
                                                         customer._id
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
                           customersPerPage={customersPerPage}
                           totalCustomers={filteredCustomers.length}
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

export default ListCustomers;
