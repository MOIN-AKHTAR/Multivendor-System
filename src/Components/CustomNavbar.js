import React, { Component } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

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
          <NavDropdown title="SignUp/Login" id="basic-nav-dropdown">
            <NavDropdown.Item href="/">SignUp</NavDropdown.Item>
            <NavDropdown.Item href="/login">LogIn</NavDropdown.Item>
          </NavDropdown>
        </Navbar>
      </>
    );
  }
}
