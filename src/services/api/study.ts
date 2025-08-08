import axiosInstance from "../axiosInstance";
import { PreferencesResponse } from "../queries/preferenceQueries";

export const fetchRecentStudiesByPreferences = async (payload: PreferencesResponse) => {
    try {
        const response = await axiosInstance.post('Asset/RecentStudiesByPreferences', payload);
        return response?.data;
    } catch (error) {
        throw error;
    }
};

export const fetchStudyDetailsByAsset = async (payload: {assetId: string | undefined}) => {
    try {
        const response = await axiosInstance.get(`/Setup/GetCombinedSetupStudyByAsset?assetID=${payload?.assetId}`);
        return response?.data;
    } catch (error) {
        throw error;
    }
};
