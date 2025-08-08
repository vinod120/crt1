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
