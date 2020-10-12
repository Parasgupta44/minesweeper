export const CHANGE_MSG = "CHANGE_MSG";

export interface ChangeMsgAction {
  type: typeof CHANGE_MSG;
  msg: string;
}

export type MessageActionTypes = ChangeMsgAction;
export type AppActionTypes = MessageActionTypes;
