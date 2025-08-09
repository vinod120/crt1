import { useQuery } from "@tanstack/react-query";
import { fetchRecentStudiesByPreferences, fetchStudyDetailsByAsset, fetchVRTStudyDetailsByStudy } from "../api/study";
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

export const useStudyDetailsByAssetQuery = (assetId: string | undefined) => {
  return useQuery({
    queryKey: [`vrtStudiesDetails-${assetId}`, assetId],
    queryFn: () => fetchStudyDetailsByAsset({ assetId: assetId! }),
    enabled: !!assetId,
  });
};

export const useVRTStudyDetailsByStudyQuery = (studyId: string | undefined, enabled: unknown) => {
  return useQuery({
    queryKey: [`studyDetails-${studyId}`, studyId],
    queryFn: () => fetchVRTStudyDetailsByStudy({ studyId: studyId! }),
    enabled: !!enabled,
  });
};