import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getGroups,
  deleteGroup,
  createGroup,
  getAllGroups
} from "../../redux/groupsReducer";
import { getUser } from "../../redux/userReducer";
import Header from "../header/Header";
import { Redirect, Link } from "react-router-dom";
import "./Groups.css";

class Groups extends Component {
  componentDidMount() {
    this.props.getUser();
    this.props.getAllGroups();
  }

  handleDeleteGroup = groupId => {
    this.props.deleteGroup(groupId);
    setTimeout(() => this.props.getUser(), 300);
  };

  render() {
    let currentUserInGroup = this.props.groups.groups.filter(group => {
      if (
        group.users_in_group.filter(
          user => user.user_id === this.props.user.user.id
        ).length
      ) {
        return true;
      } else {
        return false;
      }
    });

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
              {`< Dashboard`}
            </Link>
            <Link className="link-to-form" to="/form">
              <div onClick={this.createGroup}>Create Group</div>
            </Link>
          </div>
          <div className="group-card-main">
            <div className="group-card-container">
              {user.user.groups.length ? (
                user.user.groups.map(group => (
                  <>
                    <div className="card">
                      <div className="link-delete-wrapper">
                        <Link
                          className="card-name"
                          key={group.group_id}
                          to={`/group/${group.group_id}`}
                        >
                          <div id="content-link">{group.group_name}</div>
                        </Link>
                        <button
                          onClick={() => this.handleDeleteGroup(group.group_id)}
                          className="group-delete-btn"
                        >
                          Delete
                        </button>
                      </div>
                      {currentUserInGroup
                        .filter(item => item.group_id === group.group_id)
                        .map(item => {
                          return item.users_in_group.map(user => (
                            <div className="users-in-g-wrapper">
                              <div>{user.username}</div>
                              <img
                                className="user-img"
                                src={user.image}
                                alt=""
                              />
                            </div>
                          ));
                        })}
                    </div>
                  </>
                ))
              ) : (
                <div className="no-groups-card">
                  <div className='text'>
                    You haven't joined any groups! Click here to checkout the
                    All Groups page and get started.
                  </div>
                  <Link className="no-groups-to-all-groups" to="/allgroups">
                    All Groups
                  </Link>
                </div>
              )}
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
  { getGroups, deleteGroup, createGroup, getUser, getAllGroups }
)(Groups);
