import { createStore, combineReducers, applyMiddleware } from "redux";
import promiseMiddleware from "redux-promise-middleware";
import userReducer from "./userReducer";
import groupsReducer from "./groupsReducer";
import goalsReducer from "./goalsReducer";

const rootReducer = combineReducers({
  users: userReducer,
  groups: groupsReducer,
  goals: goalsReducer
});

export default createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(
    applyMiddleware(promiseMiddleware)
  )
);
