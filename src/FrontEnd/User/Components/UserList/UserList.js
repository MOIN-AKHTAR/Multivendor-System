import React, { useState, useEffect } from "react";
import LoadingSpinner from "../../../Shares/Loading_Spinner/LoadingSpinner";
import Model from "../../../Shares/Model/Model";
import Background from "../../../Shares/Background/Background";
import UserItem from "../../../User/Components/UserItem/UserItem";
import { useHttpHook } from "../../../Shares/Hooks/httpRequest";
import "./UserList.css";
function UserList() {
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
      const Data = await makeRequest("http://localhost:5000/User/GetAll/");
      setVendors(Data.Vendors);
      console.log(Data);
    };
    LoadVendors();
  }, [makeRequest]);
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
