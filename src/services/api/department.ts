import axiosInstance from "../axiosInstance";

export const fetchDepartments = async () => {
  try {
    const response = await axiosInstance.get("Admin/GetDepartmentDetails");
    return response?.data?.departments;
  } catch (error) {
    throw error;
  }
};