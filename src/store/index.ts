import { configureStore } from '@reduxjs/toolkit';
import preferenceReducer from './slices/preferencesSlice';
import sidebarReducer from './slices/sidebarSlice';
import themeReducer from './slices/themeSlice';

export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    theme: themeReducer,
    preferences: preferenceReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;