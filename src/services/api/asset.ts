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
