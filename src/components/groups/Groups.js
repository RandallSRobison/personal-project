import React, { Component } from "react";
import { connect } from "react-redux";
import { getGroups, deleteGroup, createGroup } from "../../redux/groupsReducer";
import { getUser } from "../../redux/userReducer";
import Header from "../header/Header";
import { Redirect, Link } from "react-router-dom";
import "./Groups.css";

class Groups extends Component {
  componentDidMount() {
  this.props.getUser()
  }

  deleteGroup = () => {
    deleteGroup();
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
              {`< dashboard`}
            </Link>
            <Link className="link-to-form" to="/form">
              <div onClick={this.createGroup}>create group</div>
            </Link>
          </div>
          <div className="group-card-main">
            <div className="group-card-container">
              {user.user.groups.map(group => (
                <>
                  <Link
                    className="card"
                    key={group.group_id}
                    to={`/group/${group.group_id}`}
                  >
                    <div className="card-name">{group.group_name}</div>
                    {currentUserInGroup
                      .filter(item => item.group_id === group.group_id)
                      .map(item => {
                        return item.users_in_group.map(user => (
                          <div>
                            <div>{user.username}</div>
                            <img
                              style={{ height: "50px", width: "50px" }}
                              src={user.image}
                              alt=""
                            />
                          </div>
                        ));
                      })}
                  </Link>
                </>
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
  { getGroups, deleteGroup, createGroup, getUser }
)(Groups);
