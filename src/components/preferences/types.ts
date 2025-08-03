import type { ReactNode } from 'react';

export interface PreferencesSelectProps {
  label: ReactNode;
  options: string[] | { label: string; value: string }[];
  value: string[];
  onChange: (value: string[]) => void;
  mode?: 'multiple' | 'tags';
  placeholder?: string;
  count?: number;
}

export interface PreferencesState {
  assetNames: string[];
  assetLocations: string[];
  manufactures: string[];
  assetTypes: string[];
  departmentIds: string[];
  loaded: boolean;
}

export interface UserPreference {
  assetNames: string[];
  assetTypes: string[];
  assetLocations: string[];
  manufactures: string[];
  departmentIds: string[];
}