import React, { useEffect, useState } from "react";
import { useHttpHook } from "../../Shares/Hooks/httpRequest";
import Background from "../../Shares/Background/Background";
import LoadingSpinner from "../../Shares/Loading_Spinner/LoadingSpinner";
import Model from "../../Shares/Model/Model";
import CategoryItem from "../CategoryItem/CategoryItem";

function CategoryList() {
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
      const Data = await makeRequest("http://localhost:5000/Category/");
      setCategory(Data);
    };
    loadCategory();
  }, [makeRequest]);
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
