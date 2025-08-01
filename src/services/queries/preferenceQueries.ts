import { useQuery } from "@tanstack/react-query";
import { fetchUserPreferecesByUserID } from "../api/preferences";

export interface PreferencesResponse {
  assetNames: string[];
  assetLocations: string[];
  manufactures: string[];
  assetTypes: string[];
  departmentIds: string[];
  assetIds?: string[]
  loaded: boolean;
}

interface PreferenceRequest {
  userId: string;
  open: boolean;
}

export const useUserPreferencesQuery = ({ userId, open }: PreferenceRequest) => {
  return useQuery<PreferencesResponse>({
    queryKey: ['userPreferences', userId],
    queryFn: () => fetchUserPreferecesByUserID(userId),
    enabled: open,
  });
};
