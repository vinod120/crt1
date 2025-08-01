import axiosInstance from "../axiosInstance";

export const fetchUserPreferecesByUserID = async (userId: string) => {
  const response = await axiosInstance.get(`/Accounts/GetUserPreferencesByUserID?userId=${userId}`);
  return response?.data?.[0] || [];
};
