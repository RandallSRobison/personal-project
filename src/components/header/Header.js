import React, { Component } from "react";
import { connect } from "react-redux";
import { logout } from "../../redux/userReducer";
import { logoutGroups } from "../../redux/groupsReducer";
import { logoutGoals } from "../../redux/goalsReducer"
import logo from "./collectiveLogoHeader.png";
import "./Header.css";

class Header extends Component {
  logout = async () => {
    await this.props.logout();
    await this.props.logoutGroups();
    await this.props.logoutGoals()
  };

  render() {
    // console.log("props", this.props);
    return (
      <div className="header">
          <img src={logo} className="main-logo-header" />
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
