import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import swal from "sweetalert";
import { Link } from "react-router-dom";

import {
   startDeleteBill,
   startGetBills,
} from "../../Redux/actions/billsActions";
import Pagination from "./Pagination";

const ListBills = (props) => {
   const [search, setSearch] = useState("");

   const { customers, bills } = useSelector((state) => state);
   //   console.log(bills.data);

   const findCustomer = (id) => {
      let custName = "";
      customers.data.find((ele) => {
         if (ele._id === id) {
            return (custName = ele.name);
         }
      });
      return custName;
   };

   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(startGetBills());
   }, [dispatch]);

   const handleSearch = (e) => {
      setSearch(e.target.value);
   };

   const filteredBills = bills.data.filter((bill) => {
      return String(bill.total).includes(search);
   });

   const handleBillRemove = (id) => {
      swal({
         title: "Are you sure?",
         text: "Do you want to Delete this Bill?",
         icon: "warning",
         buttons: [true, "Yes"],
         dangerMode: true,
      }).then((willDelete) => {
         if (willDelete) {
            dispatch(startDeleteBill(id));
            swal("Bill Deleted!", "", {
               icon: "success",
            });
         } else {
            swal("Bill not deleted!", "", "info");
         }
      });
   };

   const [currentPage, setCurrentPage] = useState(1);
   const [billsPerPage] = useState(9);

   const indexOfLastBill = currentPage * billsPerPage;
   const indexOfFirstBill = indexOfLastBill - billsPerPage;
   const currentBills = filteredBills.slice(indexOfFirstBill, indexOfLastBill);

   const paginate = (pageNumber) => {
      setCurrentPage(pageNumber);
   };

   return (
      <div>
         {bills.data.length === 0 ? (
            <div>
               <h3>No Bills Added</h3>
            </div>
         ) : (
            <div className="m-2">
               <h2 className="mb-2">
                  Listing Bills - {currentBills.length} of{" "}
                  {filteredBills.length}
               </h2>
               <input
                  type="search"
                  placeholder="Search bill by total"
                  value={search}
                  onChange={handleSearch}
                  className="form-control mb-2"
                  style={{ width: "35rem" }}
               />
               <table className="table table-bordered table-striped text-center">
                  <thead>
                     <tr className="table-success">
                        <th>SlNo</th>
                        <th>Customer</th>
                        <th>Total(in Rs)</th>
                        <th>Actions</th>
                     </tr>
                  </thead>
                  <tbody>
                     {currentBills.map((ele, i) => {
                        return (
                           <tr key={i} className="table-secondary">
                              <td>{i + 1}</td>
                              <td>{findCustomer(ele.customer)}</td>
                              <td>{ele.total}</td>
                              <td>
                                 <div className="d-flex justify-content-evenly">
                                    <button className="btn btn-outline-primary btn-sm">
                                       <Link
                                          to={{
                                             pathname: `/bills/${ele._id}`,
                                             state: ele,
                                          }}
                                          className="nav-link-sm active"
                                       >
                                          View Bill
                                       </Link>
                                    </button>
                                    <button
                                       onClick={() => {
                                          handleBillRemove(ele._id);
                                       }}
                                       className="btn btn-outline-danger btn-sm"
                                    >
                                       Remove Bill
                                    </button>
                                 </div>
                              </td>
                           </tr>
                        );
                     })}
                  </tbody>
               </table>
               <Pagination
                  billsPerPage={billsPerPage}
                  totalBills={bills.data.length}
                  paginate={paginate}
               />
            </div>
         )}
      </div>
   );
};

export default ListBills;
