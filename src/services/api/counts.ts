import axiosInstance from "../axiosInstance";

export const fetchDashboardCounts = async (payload: unknown) => {
  try {
    const response = await axiosInstance.post("/Asset/DashboardCountsByPreferences", payload);
    return response?.data || {};
  } catch (error) {
    throw error;
  }
};
