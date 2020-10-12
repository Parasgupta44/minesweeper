import { CHANGE_MSG, AppActionTypes } from "../types/actions";

export const changeMessage = (msg: string): AppActionTypes => ({
  type: CHANGE_MSG,
  msg,
});
