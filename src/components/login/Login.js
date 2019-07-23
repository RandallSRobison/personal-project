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
      <>
        <div className="main-container-2">
          <form className="form">
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
          <div className="login-btn-parent">
            <button onClick={this.loginUser} className="login-button">
              login
            </button>
          </div>
          <div>
            <Link to="/register">
              <button className="register-button">register</button>
            </Link>
          </div>
        </div>
      </>
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
