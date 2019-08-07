import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getAllGroups,
  createGroup,
  joinGroup
} from "../../redux/groupsReducer";
import Header from "../header/Header";
import { Redirect, Link } from "react-router-dom";
import "./Groups.css";

class AllGroups extends Component {
  componentDidMount() {
    let { getAllGroups } = this.props;
    getAllGroups();
  }

  handleChange = e => {
    let { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    let { user } = this.props;
    console.log(this.props);
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
              <div>Create Group</div>
            </Link>
          </div>
          <div className="group-card-main">
            <div className="group-card-container">
              {this.props.groups.groups.map(group => (
                <div className="card">
                  <div className="content-join-wrapper">
                    <div id="content-link">{group.group_name}</div>
                    <button
                      className="group-join-btn"
                      onClick={() =>
                        this.props.joinGroup(
                          group.group_id,
                          this.props.user.user.id
                        )
                      }
                    >
                      Join
                    </button>
                  </div>
                  <div>
                    {group.users_in_group.map(user => {
                      if (user.user_id === group.admin_id) {
                        return (
                          <div className="users-in-g-wrapper">
                            <div>Group Admin: {user.username}</div>
                            <img className="user-img" src={user.image} alt="" />
                          </div>
                        );
                      }
                    })}
                  </div>
                  <div>
                    {group.users_in_group.map(user => {
                      if (user.user_id !== group.admin_id) {
                        return <ul>Other Members:{user.username}</ul>;
                      }
                    })}
                  </div>
                </div>
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
  { getAllGroups, createGroup, joinGroup }
)(AllGroups);
