import React, { useState, useEffect, useContext } from "react";
import LoadingSpinner from "../../../Shares/Loading_Spinner/LoadingSpinner";
import Model from "../../../Shares/Model/Model";
import Background from "../../../Shares/Background/Background";
import UserItem from "../../../User/Components/UserItem/UserItem";
import { useHttpHook } from "../../../Shares/Hooks/httpRequest";
import { AppContext } from "../../../Shares/Context/AppContext";
import "./UserList.css";
function UserList() {
  const Auth = useContext(AppContext);
  const [
    isLoading,
    isError,
    errorHeader,
    errorDescripion,
    makeRequest,
    clearError
  ] = useHttpHook();
  const [vendors, setVendors] = useState();
  useEffect(() => {
    const LoadVendors = async e => {
      const Data = await makeRequest(
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
