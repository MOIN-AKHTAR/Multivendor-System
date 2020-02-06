import React, { Component } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { findDOMNode } from "react-dom";
import axios from "axios";
import CustomNavbar from "./CustomNavbar";
export default class SignupComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //  This property show a message whether user created or not-
      ShowMessage: false
    };
  }

  render() {
    //  CREATE NEW USER
    const Onclick = e => {
      e.preventDefault();
      // User Object Need To Be Insert
      const Obj = {
        firstName: findDOMNode(this.refs.firstName).value,
        lastName: findDOMNode(this.refs.lastName).value,
        email: findDOMNode(this.refs.email).value,
        password: findDOMNode(this.refs.password).value
      };
      axios({
        method: "POST",
        url: "http://localhost:5000/User/Signup",
        data: Obj
      })
        .then(res => {
          this.setState(
            {
              ShowMessage: true
            },
            () => {
              findDOMNode(this.refs.MySubmissionForm).reset();
            }
          );
          setTimeout(() => {
            this.setState({
              ShowMessage: false
            });
            window.location.assign("/home");
          }, 3000);
        })
        .catch(err => {
          console.log(err.message);
        });
    };

    // RENDER FUNCTION RENDERING FROM HERE
    return (
      <Container>
        <Row>
          <Col>
            {/* NAVBAR SECTION  */}
            <CustomNavbar />
          </Col>
        </Row>
        <Row>
          <Col xs={1} md={2}></Col>
          <Col xs={10} md={8}>
            <div>
              {/* SHOW MESSAGE WHEN USER CREATED */}
              {this.state.ShowMessage && (
                <h1 style={{ color: "green", textAlign: "center" }}>
                  User Created Successfully!!!
                </h1>
              )}
              <h1 style={{ textAlign: "center" }}>Sign Up</h1>
              {/* FORM FOR SUBMISSION */}
              <Form onSubmit={Onclick} ref="MySubmissionForm">
                <Form.Group controlId="firstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter First Name"
                    required
                    ref="firstName"
                  />
                </Form.Group>
                <Form.Group controlId="lastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Last Name"
                    required
                    ref="lastName"
                  />
                </Form.Group>
                <Form.Group controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter Email"
                    required
                    ref="email"
                  />
                </Form.Group>
                <Form.Group controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter Password"
                    required
                    ref="password"
                  />
                </Form.Group>

                <Button type="submit" variant="success">
                  Sign Up
                </Button>
              </Form>
            </div>
          </Col>
          <Col xs={1} md={2}></Col>
        </Row>
      </Container>
    );
  }
}
