import { useQuery } from "@tanstack/react-query";
import { fetchAssetsBasedOnPreferences } from "../api/asset";
import { PreferencesResponse } from "./preferenceQueries";

export const useAssetsBasedOnPreferencesQuery = ({ 
  enabled, 
  preferences 
}: { 
  enabled: boolean; 
  preferences?: PreferencesResponse 
}) => {
  return useQuery({
    queryKey: ['assets', preferences],
    queryFn: () => fetchAssetsBasedOnPreferences({
         departmentIds: preferences?.departmentIds || [],
         assetNames: preferences?.assetNames || [],
         assetTypes: preferences?.assetTypes || [],
         assetLocations: preferences?.assetLocations || [],
         manufactures: preferences?.manufactures || [],
         assetIds: []
       }),
       enabled: enabled && !!preferences?.departmentIds?.length,
  });
};