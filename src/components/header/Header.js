import React, { Component } from "react";
import { connect } from "react-redux";
import { logout } from "../../redux/userReducer";
import { logoutGroups } from "../../redux/groupsReducer";
import { logoutGoals } from "../../redux/goalsReducer";
import logo from "./collectiveLogoHeader.png";
import { Link } from "react-router-dom";
import "./Header.css";

class Header extends Component {
  logout = async () => {
    await this.props.logout();
    await this.props.logoutGroups();
    await this.props.logoutGoals();
  };

  render() {
    return (
      <div className="header">
        <Link to="/">
          <img src={logo} className="main-logo-header" />
        </Link>
        <button className="logout-btn" onClick={this.logout}>
          Logout
        </button>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    logout: state.logout,
    logoutGroups: state.logoutGroups,
    logoutGoals: state.logoutGoals
  };
}
export default connect(
  mapStateToProps,
  { logout, logoutGroups, logoutGoals }
)(Header);
