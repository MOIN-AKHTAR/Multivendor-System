import React, { useContext, useState, useEffect } from "react";
import Card from "../../Shares/Card/Card";
import Input from "../../Shares/Input/Input";
import LoadingSpinner from "../../Shares/Loading_Spinner/LoadingSpinner";
import Model from "../../Shares/Model/Model";
import Background from "../../Shares/Background/Background";
import { VALIDATOR_REQUIRE } from "../../Shares/Utils/Validators.js";
import SelectBar from "../../Shares/SelectBar/SelectBar";
import { useHttpHook } from "../../Shares/Hooks/httpRequest";
import { useFormState } from "../../Shares/Hooks/formState";
import { AppContext } from "../../../FrontEnd/Shares/Context/AppContext";
import "./AddProduct.css";

function AddProduct() {
  // Auth Contain All Information About Currently LoggedIn User-
  const Auth = useContext(AppContext);
  // State For Category Inorder To Fetch Category From DB And Load It Into Selection_Bar Component Of This Form
  const [categories, setCategories] = useState([]);
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
  // Here state Will Handle All The Data Of Form And inputHandler Will Check Whether Data Of Each
  // Property Is Valid Or Bot-
  const [state, inputHandler] = useFormState(
    {
      name: {
        value: "",
        isValid: false
      },
      category: {
        value: "",
        isValid: false
      },
      price: {
        value: "",
        isValid: false
      }
    },
    false
  );
  useEffect(() => {
    // Getting Category From DB
    const loadCategory = async () => {
      const Data = await makeRequest(
        "http://localhost:5000/Category",
        "GET",
        null,
        {
          "Content-Type": "application/json"
        }
      );
      const Arr = Data.Categories.map(Cat => ({
        title: Cat.name,
        value: Cat._id
      }));
      // Setting Category
      setCategories(Arr);
    };
    loadCategory();
  }, [makeRequest]);
  const AddItem = async e => {
    e.preventDefault();
    try {
      // Making Post Request Inorder To Create Product
      await makeRequest(
        "http://localhost:5000/Product/",
        "POST",
        JSON.stringify({
          name: state.inputs.name.value,
          price: state.inputs.price.value,
          category: categories[0].value || state.inputs.category.value
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + Auth.token
        }
      );
    } catch (error) {}
  };
  return (
    <div id="Add_Product">
      {isLoading && (
        <>
          <Background />
          <LoadingSpinner asOverLay />
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
      <Card>
        <form onSubmit={AddItem}>
          <Input
            element="input"
            title="Product Name"
            type="text"
            errorMsg="Please Provide Name Of Product"
            id="name"
            placeholder="Enter Name Of Product"
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
          />
          <SelectBar
            onInput={inputHandler}
            id={"category"}
            title="Category"
            Arr={categories}
          />
          <Input
            element="input"
            title="Product Price"
            type="number"
            errorMsg="Please Provide Price Of Product"
            id="price"
            placeholder="Enter Price Of Product"
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
          />
          <div id="Btn_Section">
            <button type="submit" disabled={!state.isValid}>
              ADD PRODUCT
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default AddProduct;
