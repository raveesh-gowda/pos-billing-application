/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

const Pagination = (props) => {
   const { totalCustomers, customersPerPage, paginate } = props;
   const pageNumbers = [];

   for (let i = 1; i <= Math.ceil(totalCustomers / customersPerPage); i++) {
      pageNumbers.push(i);
   }

   return (
      <nav>
         <ul className="pagination pagination-lg justify-content-center">
            {pageNumbers.map((number) => {
               return (
                  <li
                     className="page-item"
                     key={number}
                     onClick={() => {
                        paginate(number);
                     }}
                  >
                     <a className="page-link" href="#">
                        {number}
                     </a>
                  </li>
               );
            })}
         </ul>
      </nav>
   );
};

export default Pagination;
