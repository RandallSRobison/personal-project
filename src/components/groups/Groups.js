import React, { Component } from "react";
import { connect } from "react-redux";
import { getGroups, deleteGroup, createGroup } from "../../redux/groupsReducer";
import Group from "./Group";
import Header from "../header/Header";
import { Redirect, Link } from "react-router-dom";

class Groups extends Component {
  constructor() {
    super();
    this.state = {
      groupName: ""
    };
  }

  handleChange = e => {
    let { name, value } = e.target;
    this.setState({ [name]: value });
  };
  
  render() {
    let { user } = this.props;
    if (!user.user.loggedIn) return <Redirect to="/login" />;
    return (
      <div className="groups-container">
        <nav>
          <Header />
        </nav>
        <Link to="/">
          <button className="link-to-dashboard">dashboard</button>
        </Link>
        <div>
          {user.user.groups.map(group => (
            <Group key={group.id} {...group} />
          ))}
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
