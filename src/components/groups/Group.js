import React, { Component } from "react";
import { connect } from "react-redux";

class Group extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groupName: "",
      goals: [],
      goalTitle: "",
      goalDesc: "",
      goalStatus: true,
      editing: false
    };
  }

  handleChange = e => {
    let { name, value } = e.target;
    this.setState({ [name]: value });
  };

  flipEdit = () => this.setState({ editing: !this.state.editing });

  render() {
    return (
      <div>
        <h2 className="group-card-name">{this.props.group_name}</h2>
        <h4 className="group-card-goal-title">{this.props.goal_title}</h4>
      </div>
    );
  }
}

export default connect(null)(Group);
