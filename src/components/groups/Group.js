import React, { Component } from "react";
import { connect } from "react-redux";

class Group extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groupTitle: "",
      goals: [],
      goalTitle: "",
      goalDesc: "",
      goalStatus: true,
      editing: false
    };
  }

  handleChange = e => {
      console.log(this.props);
    let { name, value } = e.target;
    this.setState({ [name]: value });
  };

  flipEdit = () => this.setState({ editing: !this.state.editing });

  render() {
    return <div />;
  }
}

