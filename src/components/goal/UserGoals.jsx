import React, { Component } from "react";
import { connect } from "react-redux";
import { getGoalsByUser } from "../../redux/goalsReducer";
import Header from "../header/Header";
import { Redirect, Link } from "react-router-dom";

class UserGoals extends Component {
  componentDidMount() {
    let { getGoalsByUser, user } = this.props;
    getGoalsByUser(user.user.id);
    console.log(this.props);
  }

  render() {
    console.log("props for UserGroup", this.props);
    let { goals, groups, user } = this.props;
    if (!user.user.loggedIn) return <Redirect to="/login" />;

    let groupsIdArray = [];
    if (goals.userWithGoalsObj.length) {
      goals.userWithGoalsObj.map(group => groupsIdArray.push(group.group_id));
    }


    groupsIdArray = [...new Set(groupsIdArray)]


    return (
      <div>
        <nav>
          <Header />
        </nav>
        <div>{

        }</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: { ...state.users },
    goals: { ...state.goals }
  };
}
export default connect(
  mapStateToProps,
  { getGoalsByUser }
)(UserGoals);
