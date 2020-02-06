import React, { Component } from "react";
import { findDOMNode } from "react-dom";
import { Navbar, Form, FormControl, Button, Nav } from "react-bootstrap";
import axios from "axios";
export default class CustomNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ShowMessage: false,
      color: "",
      Message: ""
    };
  }

  render() {
    const Login = e => {
      e.preventDefault();
      const Obj = {
        email: findDOMNode(this.refs.Email).value,
        password: findDOMNode(this.refs.Password).value
      };
      axios({
        method: "POST",
        url: "http://localhost:5000/User/Login",
        data: Obj
      })
        .then(res => {
          // Clearing The Form
          findDOMNode(this.refs.SubmitForm).reset();
          // Setting Authentication Message To Show That User Is Authenticated
          this.setState(
            {
              ShowMessage: true,
              color: "green",
              Message: "Authenticated"
            },
            () => {
              setTimeout(() => {
                this.setState({
                  ShowMessage: false
                });
                window.location.assign("/home");
              }, 3000);
            }
          );
        })
        .catch(err => {
          // Setting Authentication Message To Show That User Is Not Authenticated
          this.setState(
            {
              ShowMessage: true,
              color: "red",
              Message: "Invalid Email Or Password"
            },
            () => {
              setTimeout(() => {
                this.setState({
                  ShowMessage: false
                });
              }, 3000);
            }
          );
        });
    };

    return (
      <>
        {this.state.ShowMessage && (
          <h1 style={{ color: this.state.color, textAlign: "center" }}>
            {this.state.Message}
          </h1>
        )}
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#">Project Name</Navbar.Brand>
          <Nav className="mr-auto"></Nav>
          <Form inline onSubmit={Login} ref="SubmitForm">
            <FormControl
              type="email"
              placeholder="Your Email"
              className=" mr-sm-2"
              required
              ref="Email"
            />
            <FormControl
              type="password"
              placeholder="Your Password"
              className=" mr-sm-2"
              required
              ref="Password"
            />
            <Button type="submit">Sign In</Button>
          </Form>
        </Navbar>
      </>
    );
  }
}
