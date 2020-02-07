import React, { Component } from "react";
import { findDOMNode } from "react-dom";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import axios from "axios";
import CustomNavbar from "./CustomNavbar";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ShowMessage: false,
      User: undefined,
      MessageToShow: ""
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
          window.location.assign(`/home/${res.data.User._id}`);
        })
        .catch(err => {
          // Setting Authentication Message To Show That User Is Not Authenticated
          this.setState(
            {
              ShowMessage: true,
              MessageToShow: err.response.data.Message
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
      <Container>
        <Row>
          <Col>
            <CustomNavbar />
          </Col>
        </Row>
        <Row>
          <Col>
            {this.state.ShowMessage && (
              <h1 style={{ color: "red", textAlign: "center" }}>
                {this.state.MessageToShow}
              </h1>
            )}
          </Col>
        </Row>
        <Row>
          <Col>
            <div style={{ margin: "2rem 0px" }}>
              <h1 style={{ textAlign: "center", color: "green" }}>LogIn</h1>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={2} md={3}></Col>
          <Col xs={8} md={6}>
            <Form onSubmit={Login} ref="SubmitForm">
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  required
                  ref="Email"
                />
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  required
                  ref="Password"
                />
              </Form.Group>
              <Button type="submit">Sign In</Button>
            </Form>
          </Col>
          <Col xs={2} md={3}></Col>
        </Row>
      </Container>
    );
  }
}
