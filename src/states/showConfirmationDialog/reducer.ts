import { UnknownAction } from "redux";
import { ActionType, SetShowConfirmationDialogAction } from "./action";

export type TShowConfirmationArticleDialogState = boolean;

const initialState: TShowConfirmationArticleDialogState = false;

function showConfirmationDialogReducer(
  state: TShowConfirmationArticleDialogState = initialState,
  action: UnknownAction,
): TShowConfirmationArticleDialogState {
  switch (action.type) {
    case ActionType.SET_SHOW_CONFIRMATION_DIALOG:
      return (action as SetShowConfirmationDialogAction).payload
        .showConfirmationDialog;
    default:
      return state;
  }
}

export default showConfirmationDialogReducer;
