import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "../header/Header";
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
    if (!user.user.loggedIn) return <Redirect to='/login' />
    return (
      <div>
        <nav>
          <Header />
        </nav>
        <form>
          <div>give the group a name</div>
          <input
            type="text"
            name="groupName"
            value={groupName}
            placeholder="group"
            onChange={this.handleChange}
          />
          <Link to='/'>
          <button>create group</button>
          <button>cancel</button>
          </Link>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
        user: { ...state.users}
    }
}

export default connect(
    mapStateToProps
)(Form);
