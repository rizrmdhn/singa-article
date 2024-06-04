import { Article } from "@/types/articles";
import { ActionType } from "./action";
import { ActionCreator, StateStatus } from "@/types/state";
import { UnknownAction } from "redux";

export type TArticleUserState = {
  status: StateStatus;
  data: Article[];
};

const initialState: TArticleUserState = {
  status: "Initial",
  data: [],
};

export default function articleReducer(
  state = initialState,
  action: UnknownAction,
): TArticleUserState {
  switch (action.type) {
    case ActionType.GET_ARTICLES: {
      const {
        payload: { status, data },
      } = action as ActionCreator<Article[]>;
      return {
        ...state,
        status,
        data,
      };
    }
    case ActionType.ADD_ARTICLE: {
      const {
        payload: { status, data },
      } = action as ActionCreator<Article | null>;
      return {
        ...state,
        status,
        data: status === "Success" && data ? [...state.data, data] : state.data,
      };
    }
    case ActionType.UPDATE_ARTICLE: {
      const {
        payload: { status, data },
      } = action as ActionCreator<Article | null>;
      return {
        ...state,
        status,
        data:
          status === "Success" && state.data
            ? state.data.map((article) =>
                article.id === data?.id ? data : article,
              )
            : state.data,
      };
    }
    case ActionType.DELETE_ARTICLE: {
      const {
        payload: { status, data },
      } = action as ActionCreator<string | null>;
      return {
        ...state,
        status,
        data:
          status === "Success" && state.data
            ? state.data.filter((article) => article.id !== data)
            : state.data,
      };
    }
    default:
      return state;
  }
}
