import axios from "axios";
import { LOGIN, LOGOUT, REGISTER, GET_USER, EDIT_USER } from "./actionTypes.js";

const initialState = {
  user: {},
  redirect: false,
  error: false
};

export const login = (username, password) => {
  console.log("hit login");
  let data = axios.post("/api/login", { username, password }).then(res => {
    console.log(res.data);
    return res.data;
  });
  return {
    type: LOGIN,
    payload: data
  };
};

export const register = (
  firstName,
  lastName,
  email,
  username,
  password,
  image
) => {
  let data = axios
    .post("/api/register", {
      firstName,
      lastName,
      email,
      username,
      password,
      image
    })
    .then(res => res.data);
  return {
    type: REGISTER,
    payload: data
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
    payload: axios.delete("/api/logout")
  };
};

export const getUser = () => {
  let data = axios.get("/api/user").then(res => res.data);
  return {
    type: GET_USER,
    payload: data
  };
};

export const editUser = (userId, newUsername, newImage) => {
  let data = axios
    .put(`/api/edit/user/${userId}`, { newUsername, newImage })
    .then(res => res.data);
  return {
    type: EDIT_USER,
    payload: data
  };
};

export default function(state = initialState, action) {
  let { type, payload } = action;
  switch (type) {
    case LOGIN + "_FULFILLED":
      return { ...state, user: payload, redirect: true, error: false };
    case LOGIN + "_REJECTED":
      return { ...state, error: payload };
    case LOGOUT + "_FULFILLED":
      return { user: {}, redirect: true, error: false };
    case REGISTER + "_PENDING":
      return { ...state, redirect: false, error: false };
    case REGISTER + "_FULFILLED":
      return { ...state, user: payload, redirect: true, error: false };
    case REGISTER + "_REJECTED":
      return { ...state, error: payload };
    case GET_USER + "_PENDING":
      return { ...state, redirect: false, error: false };
    case GET_USER + "_FULFILLED":
      return { ...state, user: payload, error: false };
    case GET_USER + "_REJECTED":
      return { ...state, redirect: true, error: payload };
    case EDIT_USER + "FULFILLED":
      return { ...state, user: payload, redirect: false, error: false };
    case EDIT_USER + "_REJECTED":
      return { ...state, redirect: false, error: payload };
    default:
      return state;
  }
}
