import axiosInstance from "../axiosInstance";

export const fetchDashboardCounts = async (payload: any) => {
  const response = await axiosInstance.post('/Asset/DashboardCountsByPreferences', payload);
  return response?.data || {};
};