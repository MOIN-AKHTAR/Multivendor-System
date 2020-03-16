import React, { useContext } from "react";
import Card from "../Shares/Card/Card";
import Input from "../Shares/Input/Input";
import Background from "../Shares/Background/Background";
import LoadingSpinner from "../Shares/Loading_Spinner/LoadingSpinner";
import Model from "../Shares/Model/Model";
import { useHttpHook } from "../Shares/Hooks/httpRequest";
import { useFormState } from "../Shares/Hooks/formState";
import { VALIDATOR_REQUIRE } from "../Shares/Utils/Validators.js";
import { AppContext } from "../Shares/Context/AppContext";
import { useHistory } from "react-router-dom";
import "./AddCategory.css";

function AddCategory() {
  const ChangePath = useHistory();
  const Auth = useContext(AppContext);
  const [state, inputHandler, SetDataHandler] = useFormState(
    {
      name: {
        value: "",
        isValid: false
      }
    },
    false
  );
  const [
    isLoading,
    isError,
    errorHeader,
    errorDescripion,
    makeRequest,
    clearError
  ] = useHttpHook();
  const AddCategory = async e => {
    e.preventDefault();
    try {
      await makeRequest(
        "http://localhost:5000/Category/",
        "POST",
        JSON.stringify({
          name: state.inputs.name.value,
          admin: Auth.loggedInUser
        }),
        {
          "Content-Type": "application/json"
        }
      );
      SetDataHandler(
        {
          name: {
            value: "",
            isValid: false
          }
        },
        false
      );
      //   ChangePath.push("")
    } catch (error) {}
  };
  return (
    <div id="Add_Category">
      {isLoading && (
        <React.Fragment>
          <Background />
          <LoadingSpinner asOverlay />
        </React.Fragment>
      )}
      {!isLoading && isError && (
        <React.Fragment>
          <Background />
          <Model
            header={errorHeader}
            description={errorDescripion}
            closeModel={clearError}
          />
        </React.Fragment>
      )}
      <form onSubmit={AddCategory}>
        <Card>
          <Input
            element="input"
            title="Category Name"
            type="text"
            id="name"
            errorMsg="provide First Category Name please"
            placeholder="Enter Your Category Name"
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
          />
          <div id="Btn_Section">
            <button type="submit" disabled={!state.isValid}>
              ADD CATEGORY
            </button>
          </div>
        </Card>
      </form>
    </div>
  );
}

export default AddCategory;
