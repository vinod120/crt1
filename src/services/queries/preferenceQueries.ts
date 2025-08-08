import { useQuery } from "@tanstack/react-query";
import { fetchUserPreferecesByUserID } from "../api/preferences";

export interface PreferencesResponse {
  createdDate?: any;
  createdBy?: any;
  modifiedDate?: any;
  userId?: any;
  assetNames: string[];
  assetLocations: string[];
  manufactures: string[];
  assetTypes: string[];
  departmentIds: string[];
  assetIds?: string[]
  loaded?: boolean;
}

interface PreferenceRequest {
  userId: string;
  open: boolean;
}

export const useUserPreferencesQuery = ({ userId, open }: PreferenceRequest) => {
  return useQuery<PreferencesResponse>({
    queryKey: ['userPreferences'],
    queryFn: () => fetchUserPreferecesByUserID(userId),
    enabled: open,
  });
};
