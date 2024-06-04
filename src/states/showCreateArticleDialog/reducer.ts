import { UnknownAction } from "redux";
import { ActionType, ShowCreateArticleAction } from "./action";

export type TShowCreateArticleDialogState = boolean;

const initialState: TShowCreateArticleDialogState = false;

function showCreateArticleDialogReducer(
  state: TShowCreateArticleDialogState = initialState,
  action: UnknownAction,
): TShowCreateArticleDialogState {
  switch (action.type) {
    case ActionType.SET_SHOW_CREATE_ARTICLE_DIALOG:
      return (action as ShowCreateArticleAction).payload
        .showCreateArticleDialog;
    default:
      return state;
  }
}

export default showCreateArticleDialogReducer;
