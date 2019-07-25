import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteGroup } from "../../redux/groupsReducer";

class Group extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groupName: "",
      goals: [],
      goalTitle: '',
      goalDesc: '',
      goalStatus: true,
      editing: false
    };
  }


}
