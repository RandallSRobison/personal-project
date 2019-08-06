import axios from "axios";
import {
  GET_GOALS,
  EDIT_GOAL,
  CLEAR_GOALS,
  GET_USER_GOALS,
  LOGOUT_GOALS,
  ADD_GOAL,
  DELETE_GOAL
} from "./actionTypes.js";

const initialState = {
  groupWithGoalsObj: {},
  userWithGoalsObj: {},
  error: false
};

export function getGoals(groupId) {
  let data = axios.get(`/api/goals/${groupId}`).then(res => res.data);
  return {
    type: GET_GOALS,
    payload: data
  };
}

export function editGoal(goalId) {
  let data = axios.put(`/api/edit/goals/${goalId}`).then(res => res.data);
  return {
    type: EDIT_GOAL,
    payload: data
  };
}

export function deleteGoal(groupId, goalId) {
  console.log("hitting our redoosair", groupId, goalId);
  let data = axios
    .delete(`/api/goal/${groupId}?goalId=${goalId}`)
    .then(res => res.data);

  return {
    type: DELETE_GOAL,
    payload: data
  };
}

export function addGoal(groupId, goalTitle, goalDescription) {
  let data = axios
    .post(`/api/goals/${groupId}`, { goalTitle, goalDescription })
    .then(res => res.data);
  return {
    type: ADD_GOAL,
    payload: data
  };
}

export function clearPrevGoals() {
  return {
    type: CLEAR_GOALS,
    payload: {}
  };
}

export function getGoalsByUser(userId) {
  let data = axios.get(`/api/usergoals/${userId}`).then(res => res.data);
  return {
    type: GET_USER_GOALS,
    payload: data
  };
}

export function logoutGoals() {
  return {
    type: LOGOUT_GOALS,
    payload: axios.delete("/api/logout/groups")
  };
}

export default function goalsReducer(state = initialState, action) {
  let { type, payload } = action;
  switch (type) {
    case GET_GOALS + "_PENDING":
      return { ...state, error: false };
    case GET_GOALS + "_FULFILLED":
      return { ...state, groupWithGoalsObj: payload[0], error: false };
    case GET_GOALS + "_REJECTED":
      return { ...state, error: payload };
    case EDIT_GOAL + "_FULFILLED":
      return { ...state, groupWithGoalsObj: payload[0], error: false };
    case CLEAR_GOALS:
      return { ...state, groupWithGoalsObj: payload };
    case GET_USER_GOALS + "_FULFILLED":
      return { ...state, userWithGoalsObj: payload, error: false };
    case GET_USER_GOALS + "_REJECTED":
      return { ...state, error: payload };
    case LOGOUT_GOALS + "_FULFILLED":
      return { groupWithGoalsObj: {}, userWithGoalsObj: {}, error: false };
    case ADD_GOAL + "_FULFILLED":
      return { ...state, groupWithGoalsObj: payload[0] };
    case ADD_GOAL + "_REJECTED":
      return { ...state, error: payload };
    case DELETE_GOAL + "_FULFILLED":
      console.log("this is our data on payload", payload);
      if(payload[0].goals) {
      return {
        ...state,
        error: false,
        groupWithGoalsObj: {
          ...state.groupWithGoalsObj,
          goals: [...payload[0].goals]
        }
      } 
      } else {
        return {
          ...state,
          error: false,
          groupWithGoalsObj: {
            ...state.groupWithGoalsObj,
            goals: []
          }
        } 
        
      };
    case DELETE_GOAL + "_REJECTED":
      return { ...state, error: payload };
    default:
      return state;
  }
}
