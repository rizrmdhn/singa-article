import { AppDispatch } from "..";

export enum ActionType {
  SET_SHOW_CONFIRMATION_DIALOG = "SET_SHOW_CONFIRMATION_DIALOG",
}

export type SetShowConfirmationDialogAction = {
  type: ActionType.SET_SHOW_CONFIRMATION_DIALOG;
  payload: {
    showConfirmationDialog: boolean;
  };
};

function SetShowConfirmationDialogActionCreator(
  showConfirmationDialog: boolean,
): SetShowConfirmationDialogAction {
  return {
    type: ActionType.SET_SHOW_CONFIRMATION_DIALOG,
    payload: {
      showConfirmationDialog,
    },
  };
}

function asyncSetShowConfirmationDialog(bool: boolean) {
  return async (dispatch: AppDispatch) => {
    dispatch(SetShowConfirmationDialogActionCreator(bool));
  };
}

export { asyncSetShowConfirmationDialog };
