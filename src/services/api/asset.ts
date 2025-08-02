import axiosInstance from "../axiosInstance";
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

export const fetchAssetsBasedOnPreferences = async(payload: unknown) :Promise<ApiDepartment []> => {
  const response = await axiosInstance.post('Asset/AssetsBasedOnDeptsAndPreferences', payload);
  return response?.data || [];
};