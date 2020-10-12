import { createStore, combineReducers } from "redux";
import { messageReducer, DefaultState } from "./message/MessageReducer";

export const rootReducer = combineReducers({ messageReducer });

export type AppState = ReturnType<typeof rootReducer>;

export interface InitState extends DefaultState {}

export const store = createStore(rootReducer);
