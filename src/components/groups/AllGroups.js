import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getAllGroups,
  deleteGroup,
  createGroup
} from "../../redux/groupsReducer";
import Header from "../header/Header";
import { Redirect, Link } from "react-router-dom";
import "./Groups.css";

class AllGroups extends Component {
  componentDidMount() {
    console.log("hello", this.props);
    let { getAllGroups } = this.props;
    getAllGroups();
  }

  handleChange = e => {
    let { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    console.log("f dis shizz", this.props);
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
              <div>create group</div>
            </Link>
          </div>
          <div className="group-card-main">
            <div className="group-card-container">
              {this.props.groups.groups.map(group => (
                <>
                  <div>{group.group_name}</div>
                  <div>
                    {group.users_in_group.map(user => {
                      if (user.user_id === group.admin_id) {
                        return (
                          <div>
                            <div>group admin: {user.username}</div>
                            <img src={user.image} alt="" />
                          </div>
                        );
                      }
                    })}
                  </div>
                  <div>
                    {group.users_in_group.map(user => {
                      if (user.user_id !== group.admin_id) {
                        return <ul>members:{user.username}</ul>;
                      }
                    })}
                  </div>
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
  { getAllGroups, deleteGroup, createGroup }
)(AllGroups);
