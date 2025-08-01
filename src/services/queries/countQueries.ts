import { useQuery } from "@tanstack/react-query";
import { fetchDashboardCounts } from "../api/counts";
import { PreferencesResponse } from "./preferenceQueries";

interface DashboardCountRequest {
  enabled: boolean; 
  preferences?: PreferencesResponse 
}

export const useDashboardCountsQuery = ({ 
  enabled, 
  preferences 
}: DashboardCountRequest ) => {
  return useQuery({
    queryKey: ['counts', preferences],
    queryFn: () => fetchDashboardCounts({
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