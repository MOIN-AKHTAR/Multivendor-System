import React, { useEffect, useState, useContext } from "react";
import { useHttpHook } from "../../Shares/Hooks/httpRequest";
import Background from "../../Shares/Background/Background";
import LoadingSpinner from "../../Shares/Loading_Spinner/LoadingSpinner";
import Model from "../../Shares/Model/Model";
import Input from "../../Shares/Input/Input";
import Card from "../../Shares/Card/Card";
import { AppContext } from "../../Shares/Context/AppContext";
import { VALIDATOR_REQUIRE } from "../../Shares/Utils/Validators.js";
import { useFormState } from "../../Shares/Hooks/formState";
import { useParams, useHistory } from "react-router-dom";

import "./UpdateCategory.css";
function UpdateCategory() {
  const Auth = useContext(AppContext);
  const Id = useParams().Id;
  const ChangePath = useHistory();
  const [categoryToBeUpdate, setCategoryToBeUpdate] = useState();
  const [state, inputHandler, setDataHandler] = useFormState(
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
  useEffect(() => {
    try {
      const GetCategoryToBeUpdate = async () => {
        const Data = await makeRequest(
          `http://localhost:5000/Category/${Id}`,
          "GET",
          null,
          {
            Authorization: "Bearer " + Auth.token
          }
        );

        setCategoryToBeUpdate({
          name: Data.Category.name
        });
        setDataHandler(
          {
            name: {
              value: Data.Category.name,
              isValid: true
            }
          },
          true
        );
      };
      GetCategoryToBeUpdate();
    } catch (error) {}
  }, [makeRequest, Id, setDataHandler, Auth.token]);
  const UpdateCategory = async e => {
    try {
      e.preventDefault();
      await makeRequest(
        `http://localhost:5000/Category/${Id}`,
        "PATCH",
        JSON.stringify({ name: state.inputs.name.value }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + Auth.token
        }
      );
      ChangePath.push("/viewCategory");
    } catch (error) {}
  };
  return (
    <div>
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
      {categoryToBeUpdate ? (
        <form onSubmit={UpdateCategory}>
          <div id="CategoryToBeUpdate">
            <Card>
              <Input
                element="input"
                value={categoryToBeUpdate.name}
                isValid={true}
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
                  UPDATE CATEGORY
                </button>
              </div>
            </Card>
          </div>
        </form>
      ) : (
        <>
          <Background />
          <Model asOverlay />
        </>
      )}
    </div>
  );
}

export default UpdateCategory;
