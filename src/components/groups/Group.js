import React, { Component } from "react";
import { connect } from "react-redux";
import { getGoals } from "../../redux/goalsReducer";
import Goal from "../goal/Goal";
import Header from "../header/Header";

class Group extends Component {
  componentDidMount() {
    let { getGoals, match } = this.props;
    getGoals(match.params.groupId);
  }

  render() {
    let { goals } = this.props;
    return (
      <div>
        <nav>
          <Header />
        </nav>
        <h3 className="group-group-name">
          {goals.groupWithGoalsObj.group_name}
        </h3>
        {goals.groupWithGoalsObj.goals
          ? goals.groupWithGoalsObj.goals.map(goal => {
              return <Goal key={goal.goal_id} {...goal} />;
            })
          : null}
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
  { getGoals }
)(Group);
