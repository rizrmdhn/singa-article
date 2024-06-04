// Redux imports
import { ThunkDispatch, configureStore } from "@reduxjs/toolkit";
import authUserReducer from "./authUser/reducer";
import isPreloadReducer from "./isPreload/reducer";
import themeReducer from "./theme/reducer";
import articleReducer from "./articles/reducer";
import showCreateArticleDialogReducer from "./showCreateArticleDialog/reducer";
import showConfirmationDialogReducer from "./showConfirmationDialog/reducer";

export const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    isPreload: isPreloadReducer,
    theme: themeReducer,
    articles: articleReducer,
    showCreateArticleDialog: showCreateArticleDialogReducer,
    showConfirmationDialog: showConfirmationDialogReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<
  RootState,
  unknown,
  { type: string } & Record<string, unknown>
>;
export type AppGetState = typeof store.getState;
