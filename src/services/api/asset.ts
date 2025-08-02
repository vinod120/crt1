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

export const serchByAssestOrStudy = async (payload: any) => {
  const response = await axiosInstance.get(`/Asset/GetSearchItems?searchText=${payload?.searchText}&departmentIds=${payload?.deptId}`);
  return response?.data;
};