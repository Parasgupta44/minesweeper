import { Action, Reducer } from "redux";

import { HEAD_MSG, MessageActionTypes } from "./models/actions";

import { Message } from "./models/Message";

export interface DefaultState extends Message {}

export const defaultState: DefaultState = {
  msg: "Default msg",
};

export const messageReducer: Reducer<DefaultState, Action> = (
  state = defaultState,
  action: MessageActionTypes
) => {
  const nextState = {
    msg: state.msg,
  };
  switch (action.type) {
    case HEAD_MSG:
      nextState.msg = "Redux applied";
      return nextState;
    default:
      return state;
  }
};
