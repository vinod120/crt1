import { createSlice } from '@reduxjs/toolkit';

interface ThemeState {
  theme: 'light' | 'dark';
}

const initialState: ThemeState = {
  theme: 'light',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
    document.body.setAttribute('data-theme', state.theme === 'light' ? 'dark' : 'light');
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;