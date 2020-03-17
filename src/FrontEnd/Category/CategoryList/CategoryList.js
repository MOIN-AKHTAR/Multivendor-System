import React, { useEffect, useState, useContext } from "react";
import { useHttpHook } from "../../Shares/Hooks/httpRequest";
import Background from "../../Shares/Background/Background";
import LoadingSpinner from "../../Shares/Loading_Spinner/LoadingSpinner";
import Model from "../../Shares/Model/Model";
import CategoryItem from "../CategoryItem/CategoryItem";
import { AppContext } from "../../../FrontEnd/Shares/Context/AppContext";

function CategoryList() {
  const Auth = useContext(AppContext);
  const [category, setCategory] = useState();
  const [
    isLoading,
    isError,
    errorHeader,
    errorDescription,
    makeRequest,
    clearError
  ] = useHttpHook();
  useEffect(() => {
    const loadCategory = async () => {
      const Data = await makeRequest(
        "http://localhost:5000/Category/",
        "GET",
        null,
        {
          Authorization: "Bearer " + Auth.token
        }
      );
      setCategory(Data);
    };
    loadCategory();
  }, [makeRequest, Auth.token]);
  return (
    <div>
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
            closeModel={clearError}
            header={errorHeader}
            description={errorDescription}
          />
        </>
      )}
      {category ? (
        <CategoryItem Categories={category.Categories} />
      ) : (
        <>
          <Background />
          <LoadingSpinner asOverlay />
        </>
      )}
    </div>
  );
}

export default CategoryList;
