import axios from "axios";
import {
  GET_GROUPS,
  DELETE_GROUP,
  CREATE_GROUP,
  LOGOUT_GROUPS,
  GET_ALL_GROUPS,
  JOIN_GROUP
} from "./actionTypes.js";

const initialState = {
  groups: [],
  error: false
};

export function getGroups(userId) {
  let data = axios.get(`/api/groups/${userId}`).then(res => res.data);
  return {
    type: GET_GROUPS,
    payload: data
  };
}

export function getAllGroups() {
  let data = axios.get("/api/allgroups").then(res => res.data);
  return {
    type: GET_ALL_GROUPS,
    payload: data
  };
}

export function deleteGroup(groupId) {
  console.log("groupId :", groupId);
  let data = axios.delete(`/api/groups/${groupId}`).then(res => res.data);
  console.log("hit delete reducer", data);
  return {
    type: DELETE_GROUP,
    payload: data
  };
}

export function createGroup(groupName, admin) {
  let data = axios
    .post("/api/form", { groupName, admin })
    .then(res => res.data);
  console.log("hit reducer", data);
  return {
    type: CREATE_GROUP,
    payload: data
  };
}

export function joinGroup(groupId, userId) {
  let data = axios.post("/api/join", { groupId, userId }).then(res => res.data);
  return {
    type: JOIN_GROUP,
    payload: data
  };
}

export function logoutGroups() {
  return {
    type: LOGOUT_GROUPS,
    payload: axios.delete("/api/logout/groups")
  };
}

export default function groupsReducer(state = initialState, action) {
  let { type, payload } = action;
  switch (type) {
    case GET_GROUPS + "_PENDING":
      return { ...state, error: false };
    case GET_GROUPS + "_FULFILLED":
      return { ...state, groups: payload };
    case GET_GROUPS + "_REJECTED":
      return { ...state, error: payload };
    case DELETE_GROUP + "_FULFILLED":
      return { ...state, groups: payload, error: false };
    case DELETE_GROUP + "_REJECTED":
      return { ...state, error: payload };
    case CREATE_GROUP + "_FULFILLED":
      return { ...state, error: false, groups: payload };
    case CREATE_GROUP + "_REJECTED":
      return { ...state, error: payload };
    case LOGOUT_GROUPS + "_FULFILLED":
      return { groups: [], error: false };
    case GET_ALL_GROUPS + "_PENDING":
      return { ...state, error: false };
    case GET_ALL_GROUPS + "_FULFILLED":
      return { ...state, groups: payload, error: false };
    case GET_ALL_GROUPS + "_REJECTED":
      return { ...state, error: payload };
    case JOIN_GROUP + "_FULFILLED":
      return { ...state, groups: payload, error: false };
    case JOIN_GROUP + "_REJECTED":
      return { ...state, error: payload };
    default:
      return state;
  }
}
