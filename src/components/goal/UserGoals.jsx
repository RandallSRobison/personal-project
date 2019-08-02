import React, { Component } from "react";
import { connect } from "react-redux";
import { getGoalsByUser } from "../../redux/goalsReducer";
import Header from "../header/Header";
import { Redirect, Link } from "react-router-dom";
import "./UserGoals.css";

class UserGoals extends Component {
  componentDidMount() {
    let { getGoalsByUser, user } = this.props;
    getGoalsByUser(user.user.id);
    console.log(this.props);
  }

  render() {
    console.log("props for UserGroup", this.props);
    let { goals, user } = this.props;
    if (!user.user.loggedIn) return <Redirect to="/login" />;
    return (
      <div className="user-goal-container">
        <nav>
          <Header />
        </nav>
        <div className="nav-2-container">
          <Link className="link-to-dashboard" to="/">
            {`< dashboard`}
          </Link>
        </div>
        <div className="user-goal-card-container">
          <div className="user-goal-card">
            <div id='ug-name'>Selling NYC - Group Name</div>
            <div>Goal Title</div>
            <div>Goal Description</div>
          </div>
          <div className="user-goal-card">
            <div id='ug-name'>Selling NYC - Group Name</div>
            <div>Goal Title</div>
            <div>Goal Description</div>
          </div>
          <div className="user-goal-card">
            <div id='ug-name'>Selling NYC - Group Name</div>
            <div>Goal Title</div>
            <div>Goal Description</div>
          </div>
          <div className="user-goal-card">
            <div id='ug-name'>Selling NYC - Group Name</div>
            <div>Goal Title</div>
            <div>Goal Description</div>
          </div>
        </div>
        <div>
          {goals.userWithGoalsObj.goals_in_group
            ? goals.userWithGoalsObj.goals_in_group.map(goal => {
                return (
                  <div>
                    {goal.goal_title}
                    {goal.goal_description}
                  </div>
                );
              })
            : null}
        </div>
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
