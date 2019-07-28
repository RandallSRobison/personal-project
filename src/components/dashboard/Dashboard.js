import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import { getUser } from "../../redux/userReducer";
import Header from "../header/Header";
import "./Dashboard.css";

class Dashboard extends Component {
  componentDidMount() {
    if (!this.props.user.user.loggedIn) {
      this.props.getUser();
    }
  }

  render() {
    let { user } = this.props;
    if (!user.user.loggedIn) return <Redirect to="/login" />;
    if (!user.user.loggedIn) return <div>Not logged in.</div>;
    return (
      <div className="dashboard-gradient">
        <nav className="nav-bar">
          <Header />
        </nav>
        <div className="dashboard-container">
          <h2 className="dashboard-welcome-message">{`welcome back, ${
            user.user.username
          }!`}</h2>
          <div className="dashboard-what-to-do">
            <h4>what do you want to see?</h4>
          </div>
        </div>
        <div className="dashboard-links">
          <Link to="/groups">
            <button className="dashboard-groups-link">groups</button>
          </Link>
          <Link to='/goals'>
            <button className='dashboard-goals-link'>goals</button>
          </Link>
          <Link to='/posts'>
            <button className='dashboard-posts-link'>posts</button>
          </Link>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { user: state.users };
}

export default connect(
  mapStateToProps,
  { getUser }
)(Dashboard);
