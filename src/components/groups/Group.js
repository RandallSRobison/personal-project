import React, { Component } from "react";
import { connect } from "react-redux";
import { getGoals, clearPrevGoals, addGoal } from "../../redux/goalsReducer";
import Goal from "../goal/Goal";
import Header from "../header/Header";
import { Link, Redirect, withRouter } from "react-router-dom";
import "./Group.css";

class Group extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      goalStatus: "",
      goalTitle: "",
      goalDescription: ""
    };
  }

  componentDidMount() {
    let { getGoals, match } = this.props;
    getGoals(match.params.groupId);
  }

  componentWillUnmount() {
    this.props.clearPrevGoals();
  }

  addGoal = () => {
    let { groupId } = this.props.match.params;
    this.props.addGoal(
      groupId,
      this.state.goalTitle,
      this.state.goalDescription
    );
    this.flipEdit();
  };

  handleChange = e => {
    let { name, value } = e.target;
    this.setState({ [name]: value });
  };

  flipEdit = () => {
    let { editing } = this.state;
    this.setState({ editing: !editing });
  };

  handleGoBack = () => {
    this.props.history.goBack();
  };

  render() {
    console.log("props on group", this.props);
    console.log("this.state :", this.state);
    let { goals, user } = this.props;
    let { editing, goalTitle, goalDescription } = this.state;
    if (!user.user.loggedIn) return <Redirect to="/login" />;
    return (
      <div className="group-container">
        <nav>
          <Header />
        </nav>
        <div className="nav-group-container">
          <div className="link-to-groups" onClick={this.handleGoBack}>
            {`Go Back`}
          </div>
        </div>
        <div className="group-card-holder">
          <div className="gg-card">
              <div id="gg-name">{goals.groupWithGoalsObj.group_name}</div>
              {editing ? (
                <div className='goal-input-area-wrapper'>
                  <input
                    name="goalTitle"
                    type="text"
                    value={goalTitle}
                    placeholder="goal title"
                    className="add-goal-input"
                    onChange={this.handleChange}
                  />
                  <textarea
                    name="goalDescription"
                    type="text"
                    value={goalDescription}
                    placeholder="goal description"
                    className="add-goal-text-area"
                    onChange={this.handleChange}
                  />
                  <div className="goal-save-container">
                    <button className="dash-sa-ca-btn" onClick={this.addGoal}>
                      save
                    </button>
                    <button className="dash-sa-ca-btn" onClick={this.flipEdit}>
                      cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button className="add-goal-btn" onClick={this.flipEdit}>
                  Add Goal
                </button>
              )}
            {goals.groupWithGoalsObj.goals ? (
              goals.groupWithGoalsObj.goals.map(goal => {
                return <Goal key={goal.goal_id} {...goal} />
              })
            ) : null}
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
  { getGoals, clearPrevGoals, addGoal }
)(withRouter(Group));
