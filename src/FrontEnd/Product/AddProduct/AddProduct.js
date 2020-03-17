import React, { useContext } from "react";
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
  const Auth = useContext(AppContext);
  const [
    isLoading,
    isError,
    errorHeader,
    errorDescripion,
    makeRequest,
    clearError
  ] = useHttpHook();
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
  const AddItem = async e => {
    e.preventDefault();
    try {
      const Data = await makeRequest(
        "http://localhost:5000/Product/",
        "POST",
        JSON.stringify({
          name: state.inputs.name.value,
          price: state.inputs.price.value,
          category: state.inputs.category.value
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + Auth.token
        }
      );
      console.log(Data);
    } catch (error) {}
  };
  return (
    <div id="Add_Product">
      <Card>
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
            Arr={["5e6fd4ff4a33013a10e6013a", "Labtop", "Food", "Service"]}
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
