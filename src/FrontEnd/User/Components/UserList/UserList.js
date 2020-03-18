import React, { useState, useEffect, useContext } from "react";
import LoadingSpinner from "../../../Shares/Loading_Spinner/LoadingSpinner";
import Model from "../../../Shares/Model/Model";
import Background from "../../../Shares/Background/Background";
import UserItem from "../../../User/Components/UserItem/UserItem";
import { useHttpHook } from "../../../Shares/Hooks/httpRequest";
import { AppContext } from "../../../Shares/Context/AppContext";
import "./UserList.css";
function UserList() {
  // Auth Contain All Information About Currently LoggedIn User-
  const Auth = useContext(AppContext);
  // useHttpHook is our custom hook which will give you are we loading while making request or get some error from request's response-
  // isError will show do we have any error during request-
  // errorheader and description will give you whole information on a model-
  // Makerequest is a function which help you to make request-
  // clearError is a function which will set isError as false inorder to close the error model
  // isLoading will check whether AJAX request Completed Or No-
  const [
    isLoading,
    isError,
    errorHeader,
    errorDescripion,
    makeRequest,
    clearError
  ] = useHttpHook();
  // State For Vendors
  const [vendors, setVendors] = useState();
  useEffect(() => {
    const LoadVendors = async e => {
      const Data = await makeRequest(
        // Loading All The Vendors Form DB
        "http://localhost:5000/User/GetAll/",
        "GET",
        null,
        { Authorization: "Bearer " + Auth.token }
      );
      setVendors(Data.Vendors);
    };
    LoadVendors();
  }, [makeRequest, Auth.token]);
  return (
    <React.Fragment>
      {isLoading && (
        <>
          <Background />
          <LoadingSpinner asOverlay />
        </>
      )}
      {!isLoading && isError && (
        <>
          <Background />
          <Model
            header={errorHeader}
            description={errorDescripion}
            closeModel={clearError}
          />
        </>
      )}
      {vendors ? (
        <UserItem Vendors={vendors} />
      ) : (
        <>
          <Background />
          <LoadingSpinner asOverlay />
        </>
      )}
    </React.Fragment>
  );
}

export default UserList;
