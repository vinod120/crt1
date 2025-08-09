import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface TagItem {
  path: string;
  tags: TagItem[];
  label: string;
  studyStartDate?: any;
  closable?: boolean;
}

interface TagState {
  activeTagId: string;
  tags: TagItem[];
}

const initialState: TagState = {
  activeTagId: location.pathname,
  tags: [],
};

function comparePathsByPattern(path1: string, path2: string, pattern = /^\/studies\/vrt\/\d+\//) {
  const match1 = path1.match(pattern);
  const match2 = path2.match(pattern);

  if (!match1 || !match2) {
    return {
      areEqual: false,
      message: 'One or both paths do not match the pattern',
      basePath1: null,
      basePath2: null,
      remainingPath1: path1,
      remainingPath2: path2,
    };
  }

  const basePath1 = match1[0];
  const basePath2 = match2[0];
  const areEqual = basePath1 === basePath2;

  return {
    areEqual,
    basePath: areEqual ? basePath1 : null,
    basePath1,
    basePath2,
    remainingPath1: path1.substring(basePath1.length),
    remainingPath2: path2.substring(basePath2.length),
  };
}

const tagsViewSlice = createSlice({
  name: 'tagsView',
  initialState,
  reducers: {
    setActiveTag(state, action: PayloadAction<string>) {
      state.activeTagId = action.payload;
    },
    addTag(state, action: PayloadAction<TagItem>) {
      const comparisonResult = comparePathsByPattern(state.activeTagId, action.payload.path);
      if (comparisonResult?.areEqual) {
        const existingTagIndex = state.tags.findIndex(tag => tag.path === action.payload.path);
        if (existingTagIndex !== -1) {
          state.tags[existingTagIndex] = { ...state.tags[existingTagIndex], ...action.payload };
        } else {
          state.tags.push(action.payload);
        }
      } else {
        state.tags = [action.payload];
      }
      state.activeTagId = action.payload.path;
    },
    removeTag(state, action: PayloadAction<string>) {
      const targetKey = action.payload;
      if (targetKey === state.tags[0]?.path) {
        return;
      }

      const activeTagId = state.activeTagId;
      let lastIndex = 0;

      state.tags.forEach((tag, i) => {
        if (tag.path === targetKey) {
          state.tags.splice(i, 1);
          lastIndex = i - 1;
        }
      });
      const tagList = state.tags.filter(tag => tag.path !== targetKey);

      if (tagList.length && activeTagId === targetKey) {
        if (lastIndex >= 0 && tagList[lastIndex]) {
          state.activeTagId = tagList[lastIndex].path;
        } else if (tagList[0]) {
          state.activeTagId = tagList[0].path;
        }
      }
    },
    removeAllTag(state) {
      if (state.tags[0]) {
        state.activeTagId = state.tags[0].path;
        state.tags = [state.tags[0]];
      }
    },
    removeOtherTag(state) {
      const activeTag = state.tags.find(tag => tag.path === state.activeTagId);
      if (activeTag && state.tags[0]) {
        const activeIsDashboard = activeTag.path === state.tags[0].path;
        state.tags = activeIsDashboard ? [state.tags[0]] : [state.tags[0], activeTag];
      }
    },
  },
});

export const { setActiveTag, addTag, removeTag, removeAllTag, removeOtherTag } = tagsViewSlice.actions;

export default tagsViewSlice.reducer;
