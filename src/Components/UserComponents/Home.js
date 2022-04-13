import React from "react";

const Home = (props) => {
   return (
      <div className="row">
         <div className="col-md-5">
            <h3 className="h1">
               Welcome to <em>POS Billing Home Page.</em>
            </h3>
            <h5 className="h5">
               Billing software, commonly known as invoicing software, can be
               any software designed to simply generate invoices for products
               and services rendered to customers. Billing software also comes
               with the ability to track the payment receipts from customers
               against the invoices issued. This Software enables the users to:
               <ul>
                  <li>Create a customer records.</li>
                  <li>Creat a product records.</li>
                  <li>
                     Creating the invoice of the purchase made by the customers
                     and generate the bill.
                  </li>
                  <li>Provides a dashboard to view the total revenue.</li>
               </ul>
            </h5>
         </div>
         <div className="col-md-7 my-auto">
            <img
               src="https://www.reachaccountant.com/img/billing-software.png"
               alt="home"
               className="img-fluid w-100 col-md-7"
            />
         </div>
      </div>
   );
};

export default Home;
