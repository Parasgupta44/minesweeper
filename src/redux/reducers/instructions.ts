import { CHANGE_INSTRUCTIONS, InstructionActionTypes } from "../types/actions";

import { Instruction } from "../types/Instruction";

export interface DefaultState extends Instruction {}

export const initialState: Instruction = {
  ins: "Instructions",
};

export const instructionReducer = (
  state = initialState,
  action: InstructionActionTypes
): Instruction => {
  const nextState: Instruction = {
    ins: state.ins,
  };
  switch (action.type) {
    case CHANGE_INSTRUCTIONS:
      nextState.ins = action.ins;
      return nextState;
    default:
      return state;
  }
};
