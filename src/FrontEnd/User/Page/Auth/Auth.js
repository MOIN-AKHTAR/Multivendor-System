import React, { useState, useContext } from "react";
import Card from "../../../Shares/Card/Card";
import Input from "../../../Shares/Input/Input";
import UploadImage from "../../../Shares/UploadImage/UploadImage";
import { useFormState } from "../../../Shares/Hooks/formState";
import { useHttpHook } from "../../../Shares/Hooks/httpRequest";
import Background from "../../../Shares/Background/Background";
import LoadingSpinner from "../../../Shares/Loading_Spinner/LoadingSpinner";
import { AppContext } from "../../../Shares/Context/AppContext";
import SelectBar from "../../../Shares/SelectBar/SelectBar";
import Model from "../../../Shares/Model/Model";
import { useHistory } from "react-router-dom";
import "./Auth.css";
import "../../../Shares/Button/Button.css";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE
} from "../../../Shares/Utils/Validators.js";
function Auth() {
  const ChangePath = useHistory();
  const Auth = useContext(AppContext);
  const [isInLogInMode, setIsInLogInMode] = useState(true);
  const [state, inputHandler, SetDataHandler] = useFormState(
    {
      email: {
        value: "",
        isValid: false
      },
      password: {
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
  const switchMode = e => {
    if (!isInLogInMode) {
      SetDataHandler(
        {
          ...state.inputs,
          firstName: undefined,
          lastName: undefined,
          image: undefined,
          role: undefined
        },
        state.inputs.email.isValid && state.inputs.password.isValid
      );
    } else {
      SetDataHandler(
        {
          ...state.inputs,
          firstName: {
            value: "",
            isValid: false
          },
          lastName: {
            value: "",
            isValid: false
          },
          image: {
            value: "",
            isValid: false
          },
          role: {
            value: "",
            isValid: false
          }
        },
        false
      );
    }
    setIsInLogInMode(prev => !prev);
  };
  const SignupOrLogin = async e => {
    e.preventDefault();
    if (!isInLogInMode) {
      try {
        const formData = new FormData();
        formData.append("firstName", state.inputs.firstName.value);
        formData.append("lastName", state.inputs.lastName.value);
        formData.append("image", state.inputs.image.value);
        formData.append("email", state.inputs.email.value);
        formData.append("password", state.inputs.password.value);
        formData.append("role", state.inputs.role.value);
        const Data = await makeRequest(
          "http://localhost:5000/User/Signup",
          "POST",
          formData
        );
        Auth.logIn(Data.Id, Data.Token, Data.Role);
        ChangePath.push("/");
      } catch (error) {}
    } else {
      try {
        const Data = await makeRequest(
          "http://localhost:5000/User/Login",
          "POST",
          JSON.stringify({
            email: state.inputs.email.value,
            password: state.inputs.password.value
          }),
          {
            "Content-Type": "application/json"
          }
        );
        Auth.logIn(Data.User._id, Data.Token, Data.User.role);
        ChangePath.push("/");
      } catch (error) {}
    }
  };
  return (
    <div id="Auth">
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
      <Card>
        <h1 style={{ textAlign: "center", margin: "0.5rem" }}>
          {" "}
          {isInLogInMode ? "LogIn" : "SignUp"} Required
        </h1>
        <form onSubmit={SignupOrLogin}>
          {!isInLogInMode && (
            <>
              <Input
                element="input"
                title="First Name"
                type="text"
                id="firstName"
                errorMsg="provide First Name please"
                placeholder="Enter Your First Name"
                validators={[VALIDATOR_REQUIRE()]}
                onInput={inputHandler}
              />
              <Input
                element="input"
                title="Last Name"
                type="text"
                id="lastName"
                errorMsg="provide Last Name please"
                placeholder="Enter Your Last Name"
                validators={[VALIDATOR_REQUIRE()]}
                onInput={inputHandler}
              />
              <UploadImage onInput={inputHandler} id={"image"} />
            </>
          )}
          {!isInLogInMode && <SelectBar onInput={inputHandler} id={"role"} />}
          <Input
            element="input"
            title="Email"
            type="email"
            id="email"
            errorMsg="provide email please"
            placeholder="Enter Your Email"
            validators={[VALIDATOR_EMAIL()]}
            onInput={inputHandler}
          />
          <Input
            element="input"
            title="Password"
            id="password"
            type="password"
            errorMsg="must have atleast(5) characters"
            placeholder="Enter Your Password"
            validators={[VALIDATOR_MINLENGTH(5)]}
            onInput={inputHandler}
          />
          <div id="Btn_Section">
            <button type="submit" disabled={!state.isValid}>
              {isInLogInMode ? "LogIn" : "SignUp"}
            </button>

            <button type="button" onClick={switchMode}>
              Switch To {isInLogInMode ? "SignUp" : "LogIn"}
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default Auth;
