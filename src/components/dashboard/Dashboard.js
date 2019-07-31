import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import { getUser, editUser } from "../../redux/userReducer";
import Header from "../header/Header";
import "./Dashboard.css";

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
    console.log(this.props);
    let { user } = this.props;
    let { image, username, editing } = this.state;
    if (!user.user.loggedIn) return <Redirect to="/login" />;
    if (!user.user.loggedIn) return <div>Not logged in.</div>;

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
          <h2 className="dashboard-welcome-message">{`welcome, ${
            user.user.username
          }!`}</h2>
          <div className="dashboard-what-to-do">
            <h4>what do you want to see?</h4>
          </div>
        </div>
        <div className="dashboard-links">
          <Link to="/groups">
            <button className="dashboard-groups-link">groups</button>
          </Link>
          <Link to="/goals">
            <button className="dashboard-goals-link">goals</button>
          </Link>
          <Link to="/posts">
            <button className="dashboard-posts-link">posts</button>
          </Link>
        </div>
        <div className="dash-edit-container">
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
              <div className='dash-sa-ca-container'>
                <button className="dash-sa-ca-btn" onClick={this.editUserInfo}>
                  save
                </button>
                <button className="dash-sa-ca-btn" onClick={this.flipEdit}>
                  cancel
                </button>
              </div>
            </div>
          ) : (
            <div>
              <button onClick={this.flipEdit} className="dash-edit-btn">
                edit
              </button>
            </div>
          )}
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
