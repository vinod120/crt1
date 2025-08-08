import axiosInstance from "../axiosInstance";
import { PreferencesResponse } from "../queries/preferenceQueries";

export const fetchRecentSetupsByPreferences = async (payload: PreferencesResponse) => {
    try {
        const response = await axiosInstance.post('Asset/RecentSetupsByPreferences', payload);
        return response?.data;
    } catch (error) {
        throw error
    }
};