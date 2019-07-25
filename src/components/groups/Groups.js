import React, { Component } from "react";
import { connect } from "react-redux";
import { getGroups } from "../../redux/groupsReducer";
import Group from "./Group";

class Groups extends Component {
  constructor() {
    super();
    this.state = {
      groupName: ""
    };
  }

  componentDidMount() {
      let (getGroups, groups, userId) = this.props;
      if(!groups.length) {
          getGroups(userId)
      }
  }

  handleChange = e => {
      let { name, value } = e.target;
      this.setState({ [name]: value })
  }

  editGroup = () {
      
  }
render () {
    // let {groupName } = this.state;
    let { groups } = this.props
    return (
        <div>
            {groups.map(group => (
                <Group key={group.id} {...group} />
            ))}
        </div>
    )
}
}

function mapStateToProps(state)  {
    return {
        userId: state.user,
        ...state.groups
    }
}