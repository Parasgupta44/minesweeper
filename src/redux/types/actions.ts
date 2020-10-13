export const CHANGE_MSG = "CHANGE_MSG";
export const CHANGE_INSTRUCTIONS = "CHANGE_INSTRUCTIONS";

export interface ChangeMsgAction {
  type: typeof CHANGE_MSG;
  msg: string;
}

export interface ChangeInsAction {
  type: typeof CHANGE_INSTRUCTIONS;
  ins: string;
}

export type MessageActionTypes = ChangeMsgAction;
export type InstructionActionTypes = ChangeInsAction;
export type AppActionTypes = MessageActionTypes | ChangeInsAction;
