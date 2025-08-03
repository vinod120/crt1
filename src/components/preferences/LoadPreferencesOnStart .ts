import { useUserPreferencesQuery } from "@/services/queries/preferenceQueries";
import { setPreferences } from "@/store/slices/preferencesSlice";
import LocalDBObj from "@/utils/localDb";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const LoadPreferencesOnStart = () => {
  const userDetails = JSON.parse(LocalDBObj?.getVal("userDetails") || "{}");
  const dispatch = useDispatch();
  const userId = userDetails?.userId
  const { data: userPreference, isLoading } = useUserPreferencesQuery({
    open: !!userId,
    userId,
  });

  useEffect(() => {
    if (isLoading) return;

    if (userPreference?.departmentIds?.length) {
      delete userPreference?.createdDate;
      delete userPreference?.createdBy;
      delete userPreference?.modifiedDate;
      delete userPreference?.modifiedDate;
      delete userPreference?.userId;
      dispatch(setPreferences(userPreference));
    } else if (userDetails?.deptId) {
      dispatch(
        setPreferences({
          departmentIds: [userDetails?.deptId],
          assetTypes: [],
          assetNames: [],
          assetLocations: [],
          manufactures: [],
          loaded: true,
        })
      );
    }
  }, [userPreference, isLoading, userId, userDetails?.deptId, dispatch]);

  return null;
};

export default LoadPreferencesOnStart;
