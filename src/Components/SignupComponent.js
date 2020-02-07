import React, { Component } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { findDOMNode } from "react-dom";
import axios from "axios";
import CustomNavbar from "./CustomNavbar";
export default class SignupComponent extends Component {
  state = {
    Message: false,
    Messagtoshow: ""
  };
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
          // Clearing Form
          findDOMNode(this.refs.MySubmissionForm).reset();
          // SAVING JSONWEBTOKEN
          localStorage.setItem("JWT", JSON.stringify(res.data.Token));
          // DIRECTING TO HOME
          window.location.assign(`/home/${res.data.User._id}`);
        })
        .catch(err => {
          this.setState(
            {
              Message: true,
              Messagtoshow: err.response.data.Message
            },
            () => {
              setTimeout(() => {
                this.setState({
                  Message: false
                });
              }, 3000);
            }
          );
        });
    };

    // RENDER FUNCTION RENDERING FROM HERE
    return (
      <>
        <Container>
          <Row>
            <Col>
              {/* NAVBAR SECTION  */}
              <CustomNavbar />
            </Col>
          </Row>
          <Row>
            {this.state.Message && (
              <h1 style={{ color: "red", textAlign: "center" }}>
                {this.state.Messagtoshow}
              </h1>
            )}
            <Col xs={1} md={2}></Col>
            <Col xs={10} md={8}>
              <div>
                <Row>
                  <Col>
                    <div style={{ margin: "2rem 0px" }}>
                      <h1 style={{ textAlign: "center", color: "green" }}>
                        SignUp
                      </h1>
                    </div>
                  </Col>
                </Row>
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
      </>
    );
  }
}
