import React, { Component } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { GetUser } from "../Redux/User/Actions";
class HomePage extends Component {
  componentDidMount() {
    this.props.GetUser(this.props.match.params.Id);
  }
  render() {
    const UpdateProfile = e => {
      window.location.assign(`/editprofile/${this.props.match.params.Id}`);
    };
    return (
      <>
        {!this.props.User ? (
          <p>Loading.....</p>
        ) : (
          <Container>
            <Row>
              <Col sm={12} md={4}>
                <div style={{ textAlign: "center" }}>
                  <img
                    style={{ borderRadius: "50%" }}
                    src={this.props.User.image}
                    alt="No Preview"
                  />
                  <p>{this.props.User.firstName}</p>
                  <p>{this.props.User.lastName}</p>
                  <Button variant="primary" onClick={UpdateProfile}>
                    Edit Profile
                  </Button>
                </div>
              </Col>
              <Col></Col>
            </Row>
          </Container>
        )}
      </>
    );
  }
}

const mapStateToProps = State => {
  return {
    User: State.UserData.User
  };
};
const mapDispatchToProps = dispatch => {
  return {
    GetUser: Id => dispatch(GetUser(Id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
