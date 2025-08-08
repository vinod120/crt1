import axiosInstance from "../axiosInstance";

export const getTop10Reports = async () => {
    try {
        const response = await axiosInstance.get('/DocumentsReports/GetTop10Reports');
        return response?.data;
    } catch (error) {
        throw error
    }
};