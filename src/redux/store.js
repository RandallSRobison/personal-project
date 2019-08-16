import { createStore, combineReducers, applyMiddleware } from "redux";
import promiseMiddleware from "redux-promise-middleware";
import { composeWithDevTools } from "redux-devtools-extension";
import userReducer from "./userReducer";
import groupsReducer from "./groupsReducer";
import goalsReducer from "./goalsReducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  users: userReducer,
  groups: groupsReducer,
  goals: goalsReducer
});

const persistConfig = {
  key: "root",
  storage
};

const composeEnhancers = composeWithDevTools({
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(promiseMiddleware))
);
export const persistor = persistStore(store);
