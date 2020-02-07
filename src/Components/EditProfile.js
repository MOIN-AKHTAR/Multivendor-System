import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import { GetUser } from "../Redux/User/Actions";
class EditProfile extends Component {
  componentDidMount() {
    this.props.GetUser(this.props.match.params.Id);
  }
  render() {
    return (
      <div>
        {this.props.User ? (
          <>
            <p>Id: {this.props.User._id}</p>
            <p>
              Image:{" "}
              <img
                src={this.props.User.image}
                alt="No Preview"
                style={{ borderRadius: "50%" }}
              />
            </p>
            <p>FirstName: {this.props.User.firstName}</p>
            <p>LastName: {this.props.User.lastName}</p>
            <p>Email: {this.props.User.email}</p>
            <p>Password: {this.props.User.password}</p>

            <Button>Back</Button>
            <br />
            <br />
            <Button>Update</Button>
          </>
        ) : (
          <p>Loading....</p>
        )}
      </div>
    );
  }
}

const mapStateToProps = State => {
  return {
    User: State.UserData.User
  };
};
const mapDispatchToProps = Dispatch => {
  return {
    GetUser: Id => Dispatch(GetUser(Id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
