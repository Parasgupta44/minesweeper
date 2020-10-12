import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { messageReducer, DefaultState } from "../reducers/messages";

export const rootReducer = combineReducers({
  messages: messageReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export interface InitState extends DefaultState {}

export const store = createStore(rootReducer, applyMiddleware(thunk));
