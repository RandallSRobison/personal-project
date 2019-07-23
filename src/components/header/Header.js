import React from "react";
import { connect } from "react-redux";
import { logout } from "../../redux/userReducer";

function Header(props) {
  console.log(props);
  return (
    <div className="header">
      <button className="logout-btn" onClick={props.logout}>
        logout
      </button>
    </div>
  );
}

export default connect(
  null,
  { logout }
)(Header);
