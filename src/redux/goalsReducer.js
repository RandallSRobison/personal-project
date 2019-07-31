import axios from "axios";
import { GET_GOALS, EDIT_GOAL } from "./actionTypes.js";

const initialState = {
  groupWithGoalsObj: {},
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
    default:
      return state;
  }
}
