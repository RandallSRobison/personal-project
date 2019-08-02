import React, { Component } from "react";
import { connect } from "react-redux";
import { getGoals, clearPrevGoals } from "../../redux/goalsReducer";
import Goal from "../goal/Goal";
import Header from "../header/Header";
import { Link } from "react-router-dom";
import "./Group.css";

class Group extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // goalTitle: props.goals.groupWithGoalsObj.goals.goal_title,
      // goalDescription: props.goals.groupWithGoalsObj.goal_description,
      editing: false
    };
  }

  componentDidMount() {
    let { getGoals, match } = this.props;
    getGoals(match.params.groupId);
  }

  componentWillUnmount() {
    this.props.clearPrevGoals();
  }

  render() {
    console.log("props on group", this.props);
    let { goals } = this.props;
    return (
      <div className="group-container">
        <nav>
          <Header />
        </nav>
        <div className="nav-group-container">
          <Link className="link-to-groups" to="/groups">
            {`< groups`}
          </Link>
        </div>
        <div className="group-card-holder">
          <div className='gg-card'>
            <h3 id='gg-name'>{goals.groupWithGoalsObj.group_name}</h3>
            {goals.groupWithGoalsObj.goals
              ? goals.groupWithGoalsObj.goals.map(goal => {
                  return <Goal key={goal.goal_id} {...goal} />;
                })
              : null}
          </div>
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
  { getGoals, clearPrevGoals }
)(Group);
