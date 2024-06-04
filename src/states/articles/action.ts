import { Article } from "@/types/articles";
import { ActionCreator, ActionCreatorStateStatus } from "@/types/state";
import { AppDispatch } from "..";
import { TToast } from "@/components/ui/use-toast";
import { articles } from "@/lib/api";
import { AxiosError } from "axios";
import { ErrorResponse, SchemaErrorResponse } from "@/types/response";

export enum ActionType {
  GET_ARTICLES = "GET_ARTICLES",
  ADD_ARTICLE = "ADD_ARTICLE",
  UPDATE_ARTICLE = "UPDATE_ARTICLE",
  DELETE_ARTICLE = "DELETE_ARTICLE",
}

function receiveArticlesActionCreator(
  status: ActionCreatorStateStatus,
  data: Article[],
): ActionCreator<Article[]> {
  return {
    type: ActionType.GET_ARTICLES,
    payload: {
      status,
      data,
    },
  };
}

function addArticleActionCreator(
  status: ActionCreatorStateStatus,
  data: Article | null,
): ActionCreator<Article | null> {
  return {
    type: ActionType.ADD_ARTICLE,
    payload: {
      status,
      data,
    },
  };
}

function updateArticleActionCreator(
  status: ActionCreatorStateStatus,
  data: Article | null,
): ActionCreator<Article | null> {
  return {
    type: ActionType.UPDATE_ARTICLE,
    payload: {
      status,
      data,
    },
  };
}

function deleteArticleActionCreator(
  status: ActionCreatorStateStatus,
  data: string | null,
): ActionCreator<string | null> {
  return {
    type: ActionType.DELETE_ARTICLE,
    payload: {
      status,
      data,
    },
  };
}

function asyncGetArticles(toast: TToast) {
  return async (dispatch: AppDispatch) => {
    dispatch(receiveArticlesActionCreator("Loading", []));
    try {
      const todo = await articles.getArticles();
      dispatch(receiveArticlesActionCreator("Success", todo));
    } catch (error) {
      const err = error as AxiosError<ErrorResponse>;
      if (err.response?.data.meta.message) {
        dispatch(receiveArticlesActionCreator("Error", []));
        toast({
          title: "Error",
          description: err.response.data.meta.message,
        });

        return;
      }

      toast({
        title: "Error",
        description: "An error occurred",
      });
      dispatch(receiveArticlesActionCreator("Error", []));
    }
  };
}

function asyncAddArticle(
  title: string,
  description: string,
  image: FileList,
  toast: TToast,
  closeDialog: () => void,
) {
  return async (dispatch: AppDispatch) => {
    dispatch(addArticleActionCreator("Loading", null));
    try {
      const todo = await articles.addArticle({
        title,
        description,
        image,
      });

      dispatch(addArticleActionCreator("Success", todo));
      toast({
        title: "Success",
        description: "Added successfully",
      });

      closeDialog();
    } catch (error) {
      const schemaError = error as AxiosError<SchemaErrorResponse>;
      if (schemaError.response?.data.errors) {
        dispatch(addArticleActionCreator("Error", null));
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
        dispatch(addArticleActionCreator("Error", null));
        toast({
          title: "Error",
          description: err.response.data.meta.message,
        });
        return;
      }

      toast({
        title: "Error",
        description: "An error occurred",
      });
      dispatch(addArticleActionCreator("Error", null));
    }
  };
}

function asyncUpdateArticle(
  id: string,
  title: string,
  description: string,
  image: File,
  toast: TToast,
  closeDialog: () => void,
) {
  return async (dispatch: AppDispatch) => {
    dispatch(updateArticleActionCreator("Loading", null));
    try {
      const todo = await articles.updateArticle({
        id,
        title,
        description,
        image,
      });

      dispatch(updateArticleActionCreator("Success", todo));
      toast({
        title: "Success",
        description: "Updated successfully",
      });

      closeDialog();
    } catch (error) {
      const schemaError = error as AxiosError<SchemaErrorResponse>;
      if (schemaError.response?.data.errors) {
        dispatch(updateArticleActionCreator("Error", null));
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
        dispatch(updateArticleActionCreator("Error", null));
        toast({
          title: "Error",
          description: err.response.data.meta.message,
        });
        return;
      }

      toast({
        title: "Error",
        description: "An error occurred",
      });
      dispatch(updateArticleActionCreator("Error", null));
    }
  };
}

function asyncDeleteArticle(id: string, toast: TToast) {
  return async (dispatch: AppDispatch) => {
    dispatch(deleteArticleActionCreator("Loading", ""));
    try {
      await articles.deleteArticle(id);
      dispatch(deleteArticleActionCreator("Success", id));

      toast({
        title: "Success",
        description: "Deleted successfully",
      });
    } catch (error) {
      const err = error as AxiosError<ErrorResponse>;
      if (err.response?.data.meta.message) {
        dispatch(deleteArticleActionCreator("Error", ""));
        toast({
          title: "Error",
          description: err.response.data.meta.message,
        });

        return;
      }

      toast({
        title: "Error",
        description: "An error occurred",
      });

      dispatch(deleteArticleActionCreator("Error", ""));
    }
  };
}

export {
  asyncGetArticles,
  asyncAddArticle,
  asyncUpdateArticle,
  asyncDeleteArticle,
};
