import { Asset } from "@/components/sidebar/types";
import { useQuery } from "@tanstack/react-query";
import {
  fetchAllAssetTypes,
  fetchAssetsBasedOnPreferences,
  serchByAssestOrStudy,
} from "../api/asset";
import { PreferencesResponse } from "./preferenceQueries";

export const useAssetsBasedOnPreferencesQuery = ({
  enabled,
  preferences,
}: {
  enabled: boolean;
  preferences?: PreferencesResponse;
}) => {
  return useQuery({
    queryKey: ["assets", preferences],
    queryFn: () =>
      fetchAssetsBasedOnPreferences({
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

export const useSearchByAssetsOrStudyQuery = ({
  searchText,
  enabled,
  preferences,
}: {
  searchText: any;
  enabled: boolean;
  preferences: any;
}) => {
  return useQuery({
    queryKey: ["assets-search", searchText, preferences],
    queryFn: () =>
      serchByAssestOrStudy({
        searchText: searchText?.trim(),
        deptId: preferences?.departmentIds?.join(","),
      }),
    enabled: enabled && !!preferences?.departmentIds?.length,
  });
};

export const useAssetPreferencesTypesQuery = ({ open, deptId }: { open: boolean, deptId: any }) => { 
  return useQuery<Asset[]>({
    queryKey: ['assetPreferencesTypes', deptId],
    queryFn: () => fetchAllAssetTypes({deptId}),
    enabled: open,
  });
};