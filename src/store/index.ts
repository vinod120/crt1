import { configureStore } from "@reduxjs/toolkit";
import preferenceReducer from "./slices/preferencesSlice";
import sidebarReducer from "./slices/sidebarSlice";
import tagsViewReducer from "./slices/tagsViewSlice";
import themeReducer from "./slices/themeSlice";

export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    theme: themeReducer,
    preferences: preferenceReducer,
    tagsView: tagsViewReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
