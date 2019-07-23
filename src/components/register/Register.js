import React, { Component } from "react";
import { register } from "../../redux/userReducer";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import "./Register.css";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      password: ""
    };
  }

  handleChange = e => {
    let { name, value } = e.target;
    this.setState({ [name]: value });
  };

  registerUser = () => {
    const { firstName, lastName, email, username, password } = this.state;
    this.props.register(firstName, lastName, email, username, password);
  };

  render() {
    console.log("hit register", this.props);
    const { firstName, lastName, email, username, password } = this.state;
    const { user } = this.props;
    if (user.user.loggedIn) return <Redirect to="/" />;
    return (
      <div>
        <div className="main-container">
          <div>
            <h3 className='register-title'>register</h3>
          </div>
          <form className="form">
            <input
              type="text"
              value={firstName}
              name="firstName"
              placeholder="first name"
              onChange={this.handleChange}
              className="input"
            />
            <input
              type="text"
              value={lastName}
              name="lastName"
              placeholder="last name"
              onChange={this.handleChange}
              className="input"
            />
            <input
              type="text"
              value={email}
              name="email"
              placeholder="email"
              onChange={this.handleChange}
              className="input"
            />
            <input
              type="text"
              value={username}
              name="username"
              placeholder="username"
              onChange={this.handleChange}
              className="input"
            />
            <input
              type="password"
              value={password}
              name="password"
              placeholder="password"
              onChange={this.handleChange}
              className="input"
            />
          </form>
          <div>
            <button className="btn" onClick={this.registerUser}>
              create account
            </button>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { user: state.users };
}

export default connect(
  mapStateToProps,
  { register }
)(Register);
