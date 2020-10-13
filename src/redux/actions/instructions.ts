import { CHANGE_INSTRUCTIONS, AppActionTypes } from "../types/actions";

export const changeInstruction = (ins: string): AppActionTypes => ({
  type: CHANGE_INSTRUCTIONS,
  ins,
});
