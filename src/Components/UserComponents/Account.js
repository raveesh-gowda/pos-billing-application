import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { startGetUserInfo } from "../../Redux/actions/userActions";

const Account = (props) => {
   const { user } = useSelector((state) => state);
   // console.log(user);

   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(startGetUserInfo());
   }, [dispatch]);

   return (
      <div className="m-2">
         <h2 className="h1">Account Information</h2>
         {Object.keys(user.user).length > 0 ? (
            <div className="container card bg-secondary text-white mt-4 border-dark shadow-lg">
               <div className="card-body">
                  <h4 className="h1 m-2">
                     Name:
                     <span className="display-6">{user.user.username}</span>
                  </h4>
                  <h4 className="h1 m-2">
                     Email:<span className="display-6">{user.user.email}</span>{" "}
                  </h4>
                  <h4 className="h1 m-2">
                     Business Name:
                     <span className="display-6">{user.user.businessName}</span>
                  </h4>
                  <div className="d-flex justify-content-start m-2">
                     <h4 className="h1">Address:</h4>
                     <span className="display-6"> {user.user.address}</span>
                  </div>
               </div>
            </div>
         ) : (
            <div className="text-center">
               <div
                  className="spinner-border m-5"
                  style={{ width: "4rem", height: "4rem" }}
               >
                  <span className="visually-hidden">Loading...</span>
               </div>
            </div>
         )}
      </div>
   );
};

export default Account;
