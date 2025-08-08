import { useQuery } from "@tanstack/react-query";
import { fetchRecentSetupsByPreferences } from "../api/setup";
import { PreferencesResponse } from "./preferenceQueries";

export const useRecentSetupsByPreferencesQuery = ({ 
  enabled, 
  preferences 
}: { 
  enabled: boolean; 
  preferences?: PreferencesResponse
}) => {
  return useQuery({
    queryKey: ['recent-top-setups', preferences],
    queryFn: () => fetchRecentSetupsByPreferences({
      departmentIds: preferences?.departmentIds || [],
        assetNames: preferences?.assetNames || [],
        assetTypes: preferences?.assetTypes || [],
        assetLocations: preferences?.assetLocations || [],
        manufactures: preferences?.manufactures || [],
        assetIds: [],
      }),
    enabled: enabled && !!preferences?.departmentIds?.length,
  });
};