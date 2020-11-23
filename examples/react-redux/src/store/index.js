import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

const rootReducers = combineReducers({});

export const store = createStore(rootReducers, composeWithDevTools(applyMiddleware(thunk)));

export default store;