import { PreferencesResponse } from "@/services/queries/preferenceQueries";
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const userDetails = JSON.parse(localStorage.getItem('userDetails') || '{}');

const initialState: PreferencesResponse = {
  assetNames: [],
  assetLocations: [],
  manufactures: [],
  assetTypes: [],
  departmentIds: userDetails?.deptId ? [userDetails.deptId] : [],
  loaded: false,
};

const preferencesSlice = createSlice({
  name: 'preferences',
  initialState,
  reducers: {
    setPreferences: (state, action: PayloadAction<PreferencesResponse>) => {
      return { ...state, ...action.payload, loaded: true, };
    },
    resetPreferences: (state, action: PayloadAction<PreferencesResponse>) => {
       return { ...state, ...action.payload, loaded: true, };
    },
    setDepartmentIds: (state, action: PayloadAction<PreferencesResponse>) => {
      return { ...state, ...action.payload };
    },
    setAssetNames: (state, action: PayloadAction<PreferencesResponse>) => {
      return { ...state, ...action.payload };
    },
    setAssetLocations: (state, action: PayloadAction<PreferencesResponse>) => {
      return { ...state, ...action.payload };
    },
    setManufactures: (state, action: PayloadAction<PreferencesResponse>) => {
      return { ...state, ...action.payload };
    },
    setAssetTypes: (state, action: PayloadAction<PreferencesResponse>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { 
  setPreferences, 
  resetPreferences, 
  setDepartmentIds, 
  setAssetNames, 
  setAssetLocations, 
  setManufactures, 
  setAssetTypes 
} = preferencesSlice.actions;
export default preferencesSlice.reducer;