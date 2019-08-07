import React, { Component } from "react";
import Header from "../header/Header";
import { Link } from "react-router-dom";
import "./Posts.css";
import UC from "./underConstruction.png";

export default class Posts extends Component {
  render() {
    console.log("i just loaded all over the place");
    return (
      <div className="posts-gradient">
        <nav>
          <Header />
        </nav>
        <div className="posts-dash-link-wrapper">
          <Link to="/" className="posts-dash-link">{`< Dashboard`}</Link>
        </div>
        <div className="under-construction-wrapper">
          <div className='construction-text'>
            We are so sorry! The page you have requested is under construction. Please check back soon.
          </div>
          <img src={UC} className="UC" alt="" />
        </div>
      </div>
    );
  }
}
