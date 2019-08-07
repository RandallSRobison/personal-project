import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "../header/Header";
import { createGroup } from "../../redux/groupsReducer";
import { Redirect, Link } from "react-router-dom";
import "./Form.css";

class Form extends Component {
  constructor() {
    super();
    this.state = {
      groupName: ""
    };
  }

  handleChange = e => {
    let { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    let { groupName } = this.state;
    let { user } = this.props;
    if (!user.user.loggedIn) return <Redirect to="/login" />;
    return (
      <div>
        <nav>
          <Header />
        </nav>
        <div className="form-container">
          <form className="create-group-form">
            <div className="form-title">Give The Group A Name</div>

            <input
              className="group-name-input"
              type="text"
              name="groupName"
              value={groupName}
              placeholder="group name here"
              onChange={this.handleChange}
            />
            <Link className="form-btn-wrapper" to="/">
              <div
                className="create-form-btn"
                onClick={() =>
                  this.props.createGroup(
                    this.state.groupName,
                    this.props.user.user.id
                  )
                }
              >
                Create Group
              </div>
              <div className="create-form-btn">Cancel</div>
            </Link>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: { ...state.users }
  };
}

export default connect(
  mapStateToProps,
  { createGroup }
)(Form);
