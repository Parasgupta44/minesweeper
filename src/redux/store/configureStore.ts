import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { messageReducer, DefaultState } from "../reducers/messages";
import { instructionReducer } from "../reducers/instructions";

export const rootReducer = combineReducers({
  messages: messageReducer,
  instructions: instructionReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export interface InitState extends DefaultState {}

export const store = createStore(rootReducer, applyMiddleware(thunk));
