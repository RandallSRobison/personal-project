import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import { getUser } from "../../redux/userReducer";
import Header from "../header/Header";
// import Groups from "../groups/Groups"
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
      <div className="display-container">
        <Header />
        <h3>Dashboard</h3>
        <Link to='/groups'>
          <button className='groups-link'> my groups</button>
        </Link>
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
