import React, { Component } from "react";
import { register } from "../../redux/userReducer";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import "./Register.css";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      password: "",
      image: ""
    };
  }

  handleChange = e => {
    let { name, value } = e.target;
    this.setState({ [name]: value });
  };

  registerUser = () => {
    const {
      firstName,
      lastName,
      email,
      username,
      password,
      image
    } = this.state;
    this.props.register(firstName, lastName, email, username, password, image);
  };

  addDefaultImg = e => {
    e.target.src =
      "https://secondchancetinyhomes.org/wp-content/uploads/2016/09/empty-profile.png";
  };

  render() {
    const {
      firstName,
      lastName,
      email,
      username,
      password,
      image
    } = this.state;
    const { user } = this.props;
    if (user.user.loggedIn) return <Redirect to="/" />;
    return (
      <div className="register-gradient">
        <div className="main-container-1">
          <div className="main-container2">
            <img
              onError={this.addDefaultImg}
              src={image}
              alt=""
              className="register-image"
            />
            <form className="form">
              <div>
                <h3 className="register-text">Register</h3>
              </div>
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
              <input
                type="text"
                value={image}
                name="image"
                placeholder="image url"
                onChange={this.handleChange}
                className="input"
              />
            </form>
          </div>
          <div className="create-btn-parent">
            <button className="create-btn" onClick={this.registerUser}>
              create account
            </button>
          </div>
          <div className="b2log-parent">
            <Link to="/login">
              <button className="b2log-btn">Back To Sign In</button>
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
  { register }
)(Register);
