import axiosInstance from "../axiosInstance";

export const fetchUserPreferecesByUserID = async (userId: string) => {
  try {
    const response = await axiosInstance.get(`/Accounts/GetUserPreferencesByUserID?userId=${userId}`);
    return response?.data?.[0] || [];
  } catch (error) {
    throw error
  }
};

export const SaveUserPreferences = async (payload: any) => {
  try {
    const response = await axiosInstance.post('/Accounts/SaveOrUpdateUserPreferences', payload);
    return response?.data;
  } catch (error) {
    throw error
  }
};
