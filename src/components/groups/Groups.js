import React, { Component } from "react";
import { connect } from "react-redux";
import { getGroups, deleteGroup, createGroup } from "../../redux/groupsReducer";

class Groups extends Component {
  constructor() {
    super();
    this.state = {
      groupTitle: ""
    };
  }

//   componentDidMount() {
//       let { getGroups, groups, userId} = this.props;
//     if (!groups.length) {
//         getGroups(userId)
//     }
//   }

  handleChange = e => {
      let { name, value } = e.target;
      this.setState({ [name]: value })
  }

render () {
    return (
        <div>
            {this.props.users.user.groups.map(group => <div>{group.group_name}</div>)}
        </div>
    )
}
}
function mapStateToProps(state) {
    return {
        users: {...state.users},
        groups: {...state.groups}
    }
}

export default connect(
    mapStateToProps,
    {getGroups, deleteGroup, createGroup}
)(Groups);