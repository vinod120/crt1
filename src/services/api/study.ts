import axiosInstance from "../axiosInstance";
import { PreferencesResponse } from "../queries/preferenceQueries";

export const fetchRecentStudiesByPreferences = async (
  payload: PreferencesResponse
) => {
  try {
    const response = await axiosInstance.post(
      "Asset/RecentStudiesByPreferences",
      payload
    );
    return response?.data;
  } catch (error) {
    throw error;
  }
};

export const fetchStudyDetailsByAsset = async (payload: {
  assetId: string | undefined;
}) => {
  try {
    return [
      {
        studyId: "1601761949",
        qualstudytype: "O",
        qualstudyserialno: 2,
        filename: "20201003235901_20201004123824_2_637374121757080400.rtq",
        assetid: 1601644843,
        userName: "Mounish",
        setupName: "2s_25 Lgrs_Man_CT",
        studyfilecomment: "ZA33 excluded ",
        studyStartDate: "2020-10-03 23:59:01+05:30",
        studyEndDate: "2020-10-04 12:38:24+05:30",
        studyType: "Qualification",
        assetName: "V19_25Lgrs_50 sensrs",
        studyStartedByUserId: "Automatic Event ( System )",
        setupCreationDate: "2025-06-16 23:26:03+05:30"
      },
      {
        studyId: "1601761942",
        qualstudytype: "O",
        qualstudyserialno: 2,
        filename: "20201003235901_20201004123824_2_637374121757080400.rtq",
        assetid: 1601644843,
        userName: "Mounish",
        setupName: "2s_25 Lgrs_Man_CT1",
        studyfilecomment: "ZA33 excluded ",
        studyStartDate: "2020-10-03 23:59:01+05:30",
        studyEndDate: "2020-10-04 12:38:24+05:30",
        studyType: "Qualification",
        assetName: "V19_25Lgrs_50 sensrs",
        studyStartedByUserId: "Automatic Event ( System )",
        setupCreationDate: "2025-06-16 23:26:03+05:30"
      },
    ];
    const response = await axiosInstance.get(
      `/Setup/GetCombinedSetupStudyByAsset?assetID=${payload?.assetId}`
    );
    return response?.data;
  } catch (error) {
    throw error;
  }
};

export const fetchVRTStudyDetailsByStudy = async (payload: {studyId: string}) => {
    try {
        const response = await axiosInstance.get(`Setup/GetSetupBasedonStudyID?studyID=${payload?.studyId}`);
        return response?.data || [];
    } catch (error) {
        throw error
    }
};