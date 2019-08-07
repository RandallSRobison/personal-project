import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import { getUser, editUser } from "../../redux/userReducer";
import Header from "../header/Header";
import "./Dashboard.css";
import pencil from "./editPencil.png";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: props.user.user.image,
      username: props.user.user.username,
      editing: false
    };
  }
  componentDidMount() {
    if (!this.props.user.user.loggedIn) {
      this.props.getUser();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({
        image: this.props.user.user.image,
        username: this.props.user.user.username
      });
    }
  }

  addDefaultImg = e => {
    e.target.src =
      "https://secondchancetinyhomes.org/wp-content/uploads/2016/09/empty-profile.png";
  };

  handleChange = e => {
    let { name, value } = e.target;
    this.setState({ [name]: value });
  };

  flipEdit = () => {
    this.setState({ editing: !this.state.editing });
  };

  editUserInfo = () => {
    let { id } = this.props.user.user;
    let { image, username } = this.state;
    this.props.editUser(id, image, username);
    this.flipEdit();
  };

  render() {
    let { user } = this.props;
    let { image, username, editing } = this.state;
    if (!user.user.loggedIn) return <Redirect to="/login" />;
    if (!user.user.loggedIn) return <div>Not Logged In.</div>;

    return (
      <div className="dashboard-gradient">
        <nav className="nav-bar">
          <Header />
        </nav>
        <div className="dashboard-container">
          <div className="image-container">
            <img
              onError={this.addDefaultImg}
              src={this.state.image}
              alt=""
              className="dashboard-user-img"
            />
          </div>
          <div className="edit-welcome-wrapper">
            <h2 className="dashboard-welcome-message">{`Welcome, ${
              user.user.username
            }!`}</h2>
            {editing ? (
              <div>
                <input
                  name="image"
                  type="text"
                  value={image}
                  placeholder="new image url"
                  className="dash-edit-inputs"
                  onChange={this.handleChange}
                />
                <input
                  name="username"
                  type="text"
                  value={username}
                  placeholder="new username"
                  className="dash-edit-inputs"
                  onChange={this.handleChange}
                />
                <div className="dash-sa-ca-container">
                  <button
                    className="dash-sa-ca-btn"
                    onClick={this.editUserInfo}
                  >
                    save
                  </button>
                  <button className="dash-sa-ca-btn" onClick={this.flipEdit}>
                    cancel
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <img
                  src={pencil}
                  onClick={this.flipEdit}
                  className="dash-edit-btn"
                />
              </div>
            )}
          </div>
          <div className="dashboard-what-to-do">
            <h4>What Do You Want To See?</h4>
          </div>
        </div>
        <div className="dashboard-links-wrapper">
          <Link className="dashboard-links" to="/groups">
            <div>My Groups</div>
          </Link>
          <Link className="dashboard-links" to="/allgroups">
            <div>All Groups</div>
          </Link>
          <Link className="dashboard-links" to="/goals">
            <div>Goals</div>
          </Link>
          <Link className="dashboard-links" to="/posts">
            <div>Posts</div>
          </Link>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { user: state.users };
}

export default connect(
  mapStateToProps,
  { getUser, editUser }
)(Dashboard);
