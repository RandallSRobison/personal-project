import React, { Component } from "react";
import { login } from "../../redux/userReducer";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import "./Login.css";

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
    console.log(this.props);
    let { username, password } = this.state;
    let { user } = this.props;
    if (user.user.loggedIn) return <Redirect to="/" />;
    return (
      <div className="gradient">
        <div className='logo-login-parent'>
          <img className="logo-login" alt="" />
        </div>
        <div className="main-container1">
          <div className="main-container-2">
            <form className="form">
              <h2 className="sign-in-text">sign in</h2>
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
              enter
            </button>
          </div>
          <div className="register-parent">
            <Link to="/register">
              <button className="register-button">create new account</button>
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
