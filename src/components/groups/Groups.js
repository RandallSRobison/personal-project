import React, { Component } from "react";
import { connect } from "react-redux";
import { getGroups, deleteGroup, createGroup } from "../../redux/groupsReducer";
import Header from "../header/Header";
import { Redirect, Link } from "react-router-dom";

class Groups extends Component {

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
            <Link key={group.group_id} to={`/group/${group.group_id}`}>
              {group.group_name}
            </Link>
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
