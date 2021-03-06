import React, { Component } from "react";
import { login } from "../../redux/userReducer";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import "./Login.css";
import logo from "./collectiveLogo.png";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: ""
    };
  }

  handleChange = e => {
    let { name, value } = e.target;
    this.setState({ [name]: value });
  };

  loginUser = () => {
    this.props.login(this.state.username, this.state.password);
  };

  render() {
    let { username, password } = this.state;
    let { user } = this.props;
    if (user.user.loggedIn) return <Redirect to="/" />;
    return (
      <div className="gradient">
        <div className="logo-wrapper">
          <img src={logo} className="main-logo" />
        </div>
        <img className="logo-login" alt="" />
        <div className="main-container1">
          <div className="main-container-2">
            <form className="form">
              <h2 className="sign-in-text">Sign In</h2>
              <input
                type="text"
                value={username}
                name="username"
                placeholder="username"
                onChange={this.handleChange}
                className="inputs"
              />
              <input
                type="password"
                value={password}
                name="password"
                placeholder="password"
                onChange={this.handleChange}
                className="inputs"
              />
            </form>
          </div>
          <div className="login-btn-parent">
            <button onClick={this.loginUser} className="login-button">
              Enter
            </button>
          </div>
          <div className="donate-parent">
            <Link className="donate-button" to="/donation">
              <div>Donate To Developer</div>
            </Link>
          </div>
          <div className="register-parent">
            <Link to="/register">
              <button className="register-button">Create New Account</button>
            </Link>
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
  { login }
)(Login);
