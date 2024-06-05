import { auth } from "@/lib/api";
import { AppDispatch } from "..";
import { receiveAuthUserActionCreator } from "../authUser/action";
import { ErrorResponse } from "@/types/response";
import { AxiosError } from "axios";

export enum ActionType {
  SET_IS_PRELOAD = "SET_PRELOAD",
}

export type SetIsPreloadAction = {
  type: ActionType.SET_IS_PRELOAD;
  payload: {
    isPreload: boolean | null;
  };
};

function setIsPreloadActionCreator(
  isPreload: boolean | null,
): SetIsPreloadAction {
  return {
    type: ActionType.SET_IS_PRELOAD,
    payload: {
      isPreload,
    },
  };
}

function asyncSetIsPreload() {
  return async (dispatch: AppDispatch) => {
    dispatch(receiveAuthUserActionCreator("Loading", null));
    try {
      const authUser = await auth.me();
      if (authUser.role.name !== "admin") {
        dispatch(receiveAuthUserActionCreator("Error", null));
        return;
      }

      dispatch(receiveAuthUserActionCreator("Success", authUser));
    } catch (error) {
      const err = error as AxiosError<ErrorResponse>;
      if (err.response?.data.meta.message) {
        const authUser = await auth.refresh();
        if (authUser) {
          dispatch(receiveAuthUserActionCreator("Success", authUser));
          return;
        }

        dispatch(receiveAuthUserActionCreator("Error", null));
        return;
      }
      dispatch(setIsPreloadActionCreator(null));
      dispatch(receiveAuthUserActionCreator("Error", null));
    } finally {
      dispatch(setIsPreloadActionCreator(false));
    }
  };
}

export { asyncSetIsPreload };
