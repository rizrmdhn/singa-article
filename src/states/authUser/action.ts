import { TToast } from "@/components/ui/use-toast";
import { auth } from "@/lib/api";
import { ActionCreator, ActionCreatorStateStatus } from "@/types/state";
import { User } from "@/types/user";
import { AppDispatch } from "..";
import { AxiosError } from "axios";
import { ErrorResponse, SchemaErrorResponse } from "@/types/response";
import { NavigateFunction } from "react-router-dom";

export enum ActionType {
  SET_AUTH_USER = "SET_AUTH_USER",
  UNSET_AUTH_USER = "UNSET_AUTH_USER",
}

function receiveAuthUserActionCreator(
  status: ActionCreatorStateStatus,
  data: User | null,
): ActionCreator<User | null> {
  return {
    type: ActionType.SET_AUTH_USER,
    payload: {
      status,
      data,
    },
  };
}

function unsetAuthUserActionCreator(): ActionCreator<null> {
  return {
    type: ActionType.UNSET_AUTH_USER,
    payload: {
      status: "Success",
      data: null,
    },
  };
}

function asyncSetAuthUser(email: string, password: string, toast: TToast) {
  return async (dispatch: AppDispatch) => {
    dispatch(receiveAuthUserActionCreator("Loading", null));
    try {
      await auth.login({ email, password });
      const user = await auth.me();

      toast({
        title: "Success",
        description: "Logged in successfully",
      });

      dispatch(receiveAuthUserActionCreator("Success", user));
    } catch (error) {
      const schemaError = error as AxiosError<SchemaErrorResponse>;
      if (schemaError.response?.data.errors) {
        dispatch(receiveAuthUserActionCreator("Error", null));
        schemaError.response?.data.errors.forEach((error) => {
          toast({
            title: "Error",
            description: error.message,
          });
        });
        return;
      }

      const err = error as AxiosError<ErrorResponse>;

      if (err.response?.data.meta.message) {
        dispatch(receiveAuthUserActionCreator("Error", null));
        toast({
          title: "Error",
          description: err.response.data.meta.message,
        });

        return;
      }

      console.error(error);
      toast({
        title: "Error",
        description: "Something went wrong",
      });
      dispatch(receiveAuthUserActionCreator("Error", null));
    }
  };
}

function asyncUnsetAuthUser(navigate: NavigateFunction) {
  return async (dispatch: AppDispatch) => {
    await auth.logout();
    dispatch(unsetAuthUserActionCreator());
    navigate("/");
  };
}

export { receiveAuthUserActionCreator, asyncSetAuthUser, asyncUnsetAuthUser };
