import React from "react";
import swal from "sweetalert";
import { Link, Route, withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";

import Home from "./UserComponents/Home";
import Login from "./UserComponents/Login";
import Register from "./UserComponents/Register";
import Account from "./UserComponents/Account";
import CustomerContainer from "./CustomersComponents/CustomerContainer";
import ProductsContainer from "./ProductsComponents/ProductsContainer";
import BillingContainer from "./BillingComponents/BillingContainer";
import DashboardContainer from "./DashboardComponents/DashboardContainer";
import BillDetails from "./BillingComponents/BillDetails";
import PrivateRouter from "../helper/PrivateRouter";
import { userLogout } from "../Redux/actions/userActions";

const NavBar = (props) => {
   const { userLoggedIn, handleAuth } = props;

   const dispatch = useDispatch();

   const handleLogout = () => {
      localStorage.removeItem("token");
      dispatch(userLogout());
      handleAuth();
      props.history.push("/");
      swal({
         title: "Logged Out successfully",
         icon: "success",
      });
   };

   return (
      <div>
         <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div>
               <ul className="nav justify-content-evenly">
                  <li>
                     <Link className="nav-link text-white" to="/">
                        Home
                     </Link>
                  </li>
                  {userLoggedIn ? (
                     <>
                        <li>
                           <Link
                              className="nav-link text-white"
                              to="/dashboard"
                           >
                              Dashboard
                           </Link>
                        </li>
                        <li>
                           <Link className="nav-link text-white" to="/account">
                              Account
                           </Link>
                        </li>
                        <li>
                           <Link
                              className="nav-link text-white"
                              to="/customers"
                           >
                              Customers
                           </Link>
                        </li>
                        <li>
                           <Link className="nav-link text-white" to="/products">
                              Products
                           </Link>
                        </li>
                        <li>
                           <Link className="nav-link text-white" to="/billing">
                              Billing
                           </Link>
                        </li>
                        <li>
                           <Link
                              className="nav-link text-white"
                              to=""
                              onClick={handleLogout}
                           >
                              Logout
                           </Link>
                        </li>
                     </>
                  ) : (
                     <>
                        <li>
                           <Link className="nav-link text-white" to="/register">
                              Register
                           </Link>
                        </li>
                        <li>
                           <Link className="nav-link text-white" to="/login">
                              Login
                           </Link>
                        </li>
                     </>
                  )}
               </ul>
            </div>
         </nav>
         <Route path="/" component={Home} exact />
         <Route path="/register" component={Register} exact={true} />
         <Route
            path="/login"
            render={(props) => {
               return <Login {...props} handleAuth={handleAuth} />;
            }}
            exact={true}
         />
         <PrivateRouter path="/account" component={Account} exact={true} />
         <PrivateRouter
            path="/customers"
            component={CustomerContainer}
            exact={true}
         />
         <PrivateRouter
            path="/products"
            component={ProductsContainer}
            exact={true}
         />
         <PrivateRouter
            path="/billing"
            component={BillingContainer}
            exact={true}
         />
         <PrivateRouter
            path="/bills/:id"
            component={BillDetails}
            exact={true}
         />
         <PrivateRouter
            path="/dashboard"
            component={DashboardContainer}
            exact={true}
         />
      </div>
   );
};

export default withRouter(NavBar);
