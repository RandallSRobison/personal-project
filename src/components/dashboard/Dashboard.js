import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getUser } from "../../redux/userReducer";
import Header from '../header/Header'
import "./Dashboard.css";

class Dashboard extends Component {
  componentDidMount() {
    if (!this.props.user.user.loggedIn) {
      this.props.getUser();
    }
  }

  render() {
    console.log('adsfla;skdjfalsdfj')
    let { user } = this.props;
    if (!user.user.loggedIn) return <Redirect to="/login" />;
    if (!user.user.loggedIn) return <div>Not logged in.</div>;
    return (
      <div className="display-container">
        <Header />
        <h3>Dashboard</h3>
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
