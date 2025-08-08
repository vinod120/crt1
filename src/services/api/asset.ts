import axiosInstance from "../axiosInstance";
import { PreferencesResponse } from "../queries/preferenceQueries";
interface AssetInfo {
  assetId: string;
  assetName: string;
  description: string;
  manufacturer: string;
  location: string;
  assetTypeName: string;
}

interface ApiDepartment  {
  departmentId: string;
  deptName: string;
  assetInfo: AssetInfo[];
}

export const fetchAssetsBasedOnPreferences = async(payload: PreferencesResponse) :Promise<ApiDepartment []> => {
  try {
    const response = await axiosInstance.post('Asset/AssetsBasedOnDeptsAndPreferences', payload);
    return response?.data || [];
  } catch (error) {
    throw error;
  }
};

export const serchByAssestOrStudy = async (payload: any) => {
  try {
    const response = await axiosInstance.get(`/Asset/GetSearchItems?searchText=${payload?.searchText}&departmentIds=${payload?.deptId}`);
    return response?.data;
  } catch (error) {
    throw error;
  }
};
export const fetchAllAssetTypes = async (payload: any) => {
    try {
        const { deptId } = payload;
        const response = await axiosInstance.get(`Asset/GetAllAssetTypes?departmentID=${deptId}`);
        return response?.data;
    } catch (error) {
        throw error
    }
};

export const fetchRecentAssetsByPreferences = async (payload: PreferencesResponse) => {
  try {
    const response = await axiosInstance.post('Asset/RecentAssetsByPreferences', payload);
    return response?.data;
  } catch (error) {
    throw error;
  }
};