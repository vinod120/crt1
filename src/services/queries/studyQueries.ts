import { useQuery } from "@tanstack/react-query";
import { fetchRecentStudiesByPreferences } from "../api/study";
import { PreferencesResponse } from "./preferenceQueries";

export const useRecentStudiesByPreferencesQuery = ({
  enabled,
  preferences,
}: {
  enabled: boolean;
  preferences?: PreferencesResponse;
}) => {
  return useQuery({
    queryKey: ["recent-top-studies", preferences],
    queryFn: () =>
      fetchRecentStudiesByPreferences({
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
