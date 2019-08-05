import React, { Component } from "react";
import { connect } from "react-redux";
// import { editGoal } from "../../redux/goalsReducer";
import { Link } from "react-router-dom";
import "./Goal.css";

class Goal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goalTitle: props.goal_title,
      goalDescription: props.goal_description,
      goalStatus: props.goal_status
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
          <h3 className="goal-title">
          {this.props.goal_title}
          </h3>
          {this.props.goal_description}
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

export default connect(mapStateToProps)(Goal);
