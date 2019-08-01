import React, { Component } from "react";
import { connect } from "react-redux";
import { getGroups, deleteGroup, createGroup } from "../../redux/groupsReducer";
import Header from "../header/Header";
import { Redirect, Link } from "react-router-dom";
import "./Groups.css";

class Groups extends Component {
  handleChange = e => {
    let { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    let { user } = this.props;
    if (!user.user.loggedIn) return <Redirect to="/login" />;
    return (
      <div className="groups-gradient">
        <div className="groups-container">
          <nav>
            <Header />
          </nav>
          <div className="nav-2-container">
            <Link className="link-to-dashboard" to="/">
              {`< dashboard`}
            </Link>
            <button className="create-group-button">create group</button>
          </div>
          <div className="group-card-main">
            <div className="group-card-container">
              {user.user.groups.map(group => (
                <Link
                  className="card"
                  key={group.group_id}
                  to={`/group/${group.group_id}`}
                >
                  {group.group_name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: { ...state.users },
    groups: { ...state.groups }
  };
}

export default connect(
  mapStateToProps,
  { getGroups, deleteGroup, createGroup }
)(Groups);
