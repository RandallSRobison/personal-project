import React, { Component } from "react";
import { connect } from "react-redux";
import { getGoals, clearPrevGoals } from "../../redux/goalsReducer";
import Goal from "../goal/Goal";
import Header from "../header/Header";
import { Link, Redirect } from "react-router-dom";
import "./Group.css";

class Group extends Component {
  componentDidMount() {
    let { getGoals, match } = this.props;
    getGoals(match.params.groupId);
  }

  componentWillUnmount() {
    this.props.clearPrevGoals();
  }

  render() {
    console.log("props on group", this.props);
    let { goals, user } = this.props;
    if (!user.user.loggedIn) return <Redirect to="/login" />;
    return (
      <div className="group-container">
        <nav>
          <Header />
        </nav>
        <div className="nav-group-container">
          <Link className="link-to-groups" to="/groups">
            {`< Groups`}
          </Link>
        </div>
        <div className="group-card-holder">
          <div className="gg-card">
            <div className='name-add-wrapper'>
              {" "}
              <h3 id="gg-name">{goals.groupWithGoalsObj.group_name}</h3>
              <button className='add-goal-btn'>Add Goal</button>
            </div>

            {goals.groupWithGoalsObj.goals ? (
              goals.groupWithGoalsObj.goals.map(goal => {
                return <Goal key={goal.goal_id} {...goal} />;
              })
            ) : (
              <div>You currently have no goals for this group.</div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    goals: { ...state.goals },
    user: { ...state.users }
  };
}

export default connect(
  mapStateToProps,
  { getGoals, clearPrevGoals }
)(Group);
