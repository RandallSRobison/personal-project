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
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.render();
    }
  }

  render() {
    let { goals, user } = this.props;
    if (!user.user.loggedIn) return <Redirect to="/login" />;
    return (
      <div className="user-goal-container">
        <nav>
          <Header />
        </nav>
        <div className="nav-2-container">
          <Link className="link-to-dashboard" to="/">
            {`< Dashboard`}
          </Link>
        </div>
        <div className="user-goal-card-container">
          {goals.userWithGoalsObj.length ? (
            goals.userWithGoalsObj.map(group => {
              return (
                <div className="user-goal-card">
                  <Link className="ug-name" to={`/group/${group.group_id}`}>
                    <div className="actual-name">{group.group_name}</div>
                  </Link>
                  {group.goals_in_group
                    ? group.goals_in_group.map(goal => {
                        return (
                          <div>
                            <ul className="user-goal-title">
                              {goal.goal_title}
                            </ul>
                            <p className="user-goal-description">
                              {goal.goal_description}
                            </p>
                          </div>
                        );
                      })
                    : null}
                </div>
              );
            })
          ) : (
            <div className="no-group-goals">
              You do not have any groups with goals.
            </div>
          )}
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
