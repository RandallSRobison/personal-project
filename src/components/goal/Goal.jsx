import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteGoal, changeGoalStatus } from "../../redux/goalsReducer";
import "./Goal.css";
import { withRouter } from "react-router-dom";

class Goal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goalStatus: this.props.goals.groupWithGoalsObj.goals.goal_status
    };
  }

  handleChange = e => {
    let { name, value } = e.target;
    this.setState({ [name]: value });
  };

  flipGoalStatus = () => {
    let { goalStatus } = this.state;
    this.setState({ goalStatus: !goalStatus });
  };

  render() {
    return (
      <div>
        <div>
          <div className="delete-goal-wrapper">
            <button
              className="delete-btn"
              onClick={() =>
                this.props.deleteGoal(
                  this.props.match.params.groupId,
                  this.props.goal_id
                )
              }
            >
              X
            </button>
            <h3 className="goal-title">{this.props.goal_title}</h3>
          </div>
          <h5 className="goal-description">{this.props.goal_description}</h5>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    goals: { ...state.goals }
  };
}

export default connect(
  mapStateToProps,
  { deleteGoal, changeGoalStatus }
)(withRouter(Goal));
// export default Goal;
