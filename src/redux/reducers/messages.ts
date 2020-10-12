import { CHANGE_MSG, MessageActionTypes } from "../types/actions";

import { Message } from "../types/Message";

export interface DefaultState extends Message {}

export const initialState: Message = {
  msg: "Play it already...",
};

export const messageReducer = (
  state = initialState,
  action: MessageActionTypes
): Message => {
  const nextState: Message = {
    msg: state.msg,
  };
  switch (action.type) {
    case CHANGE_MSG:
      nextState.msg = action.msg;
      //   nextState.msg = "Redux applied";
      return nextState;
    default:
      return state;
  }
};
