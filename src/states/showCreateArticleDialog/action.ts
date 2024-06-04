import { AppDispatch } from "..";

export enum ActionType {
  SET_SHOW_CREATE_ARTICLE_DIALOG = "SET_SHOW_CREATE_ARTICLE_DIALOG",
}

export type ShowCreateArticleAction = {
  type: ActionType.SET_SHOW_CREATE_ARTICLE_DIALOG;
  payload: {
    showCreateArticleDialog: boolean;
  };
};

function setShowCreateArticleDialogActionCreator(
  showCreateArticleDialog: boolean,
): ShowCreateArticleAction {
  return {
    type: ActionType.SET_SHOW_CREATE_ARTICLE_DIALOG,
    payload: {
      showCreateArticleDialog: showCreateArticleDialog,
    },
  };
}

function asyncShowCreateArticleDialogActionCreator(bool: boolean) {
  return async (dispatch: AppDispatch) => {
    dispatch(setShowCreateArticleDialogActionCreator(bool));
  };
}

export { asyncShowCreateArticleDialogActionCreator };
