import { notify } from "@/common/services/notificationService";
import { SaveUserPreferences } from "@/services/api/preferences";
import { useAssetPreferencesTypesQuery } from "@/services/queries/assetQueries";
import { useDepartmentQuery } from "@/services/queries/departmentQueries";
import { useUserPreferencesQuery } from "@/services/queries/preferenceQueries";
import { RootState } from "@/store";
import {
  resetPreferences,
  setPreferences,
} from "@/store/slices/preferencesSlice";
import LocalDBObj from "@/utils/localDb";
import { useQueryClient } from "@tanstack/react-query";
import { Button, Drawer, Space, Tooltip } from "antd";
import useBreakpoint from "antd/es/grid/hooks/useBreakpoint";
import type { FC } from "react";
import React, {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { MdRoomPreferences } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import "./preferences.css";
import PreferencesContent from "./PreferencesContent";
import { PreferencesState, UserPreference } from "./types";

class ErrorBoundary extends React.Component<{
  children: React.ReactNode;
  fallback: React.ReactNode;
}> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

const Preferences: FC = React.memo(() => {
  const userDetails = JSON.parse(LocalDBObj?.getVal("userDetails") || "{}");
  const { sm } = useBreakpoint();
  const dispatch = useDispatch();
  const preferences = useSelector((state: RootState) => state.preferences);
  const [open, setOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const queryClient = useQueryClient();

  const { data: userPreference, isLoading: userPreferenceLoading } =
    useUserPreferencesQuery({ open, userId: userDetails?.userId });

  const deptId = preferences?.departmentIds?.length
    ? preferences?.departmentIds?.join(",")
    : userDetails?.deptId || "";

  const { data: assets = [], isLoading: assetPreferencesTypesLoading } =
    useAssetPreferencesTypesQuery({
      open,
      deptId,
    });

  const { data: departments = [], isLoading: departmentsLoading } =
    useDepartmentQuery({ open });

  const uniqueValues = useMemo(() => {
    const allUniqueValues = {
      assetNames: [
        ...new Set(assets.map((asset) => asset.assetName).filter(Boolean)),
      ],
      assetLocations: [
        ...new Set(assets.map((asset) => asset.location).filter(Boolean)),
      ],
      manufactures: [
        ...new Set(assets.map((asset) => asset.manufacturer).filter(Boolean)),
      ],
      assetTypes: [
        ...new Set(assets.map((asset) => asset.assetTypeName).filter(Boolean)),
      ],
      departmentIds: departments
        .filter(
          (dept) =>
            typeof dept.deptId === "string" && typeof dept.deptName === "string"
        )
        .map((dept) => ({
          label: dept.deptName,
          value: dept.deptId,
          disabled: userDetails?.deptId === dept.deptId,
        })),
    };

    const filterAssetsExcluding = (
      excludeCategory: keyof PreferencesState | null
    ) => {
      let filteredAssets = assets;
      if (
        excludeCategory !== "assetNames" &&
        preferences.assetNames.length > 0
      ) {
        filteredAssets = filteredAssets.filter((asset) =>
          preferences.assetNames.includes(asset.assetName)
        );
      }
      if (
        excludeCategory !== "assetLocations" &&
        preferences.assetLocations.length > 0
      ) {
        filteredAssets = filteredAssets.filter((asset) =>
          preferences.assetLocations.includes(asset.location)
        );
      }
      if (
        excludeCategory !== "manufactures" &&
        preferences.manufactures.length > 0
      ) {
        filteredAssets = filteredAssets.filter((asset) =>
          preferences.manufactures.includes(asset.manufacturer)
        );
      }
      if (
        excludeCategory !== "assetTypes" &&
        preferences.assetTypes.length > 0
      ) {
        filteredAssets = filteredAssets.filter((asset) =>
          preferences.assetTypes.includes(asset.assetTypeName)
        );
      }
      return filteredAssets;
    };

    return {
      assetNames: [
        ...new Set(
          filterAssetsExcluding("assetNames")
            .map((asset) => asset.assetName)
            .filter(Boolean)
        ),
      ],
      assetLocations: [
        ...new Set(
          filterAssetsExcluding("assetLocations")
            .map((asset) => asset.location)
            .filter(Boolean)
        ),
      ],
      manufactures: [
        ...new Set(
          filterAssetsExcluding("manufactures")
            .map((asset) => asset.manufacturer)
            .filter(Boolean)
        ),
      ],
      assetTypes: [
        ...new Set(
          filterAssetsExcluding("assetTypes")
            .map((asset) => asset.assetTypeName)
            .filter(Boolean)
        ),
      ],
      departmentIds: allUniqueValues.departmentIds,
    };
  }, [assets, departments, preferences, userDetails?.deptId]);

  const handleSave = useCallback(async () => {
    setIsSaving(true);
    try {
      await SaveUserPreferences({
        userId: userDetails?.userId || "",
        assetNames: preferences.assetNames,
        assetTypes: preferences.assetTypes,
        assetLocations: preferences.assetLocations,
        manufactures: preferences.manufactures,
        departmentIds: preferences.departmentIds,
        createdBy: userDetails?.userName || "",
      });

      setOpen(false);

      queryClient.setQueryData<UserPreference[]>(
        ["userPreferences"],
        [
          {
            assetNames: preferences.assetNames,
            assetTypes: preferences.assetTypes,
            assetLocations: preferences.assetLocations,
            manufactures: preferences.manufactures,
            departmentIds: preferences.departmentIds,
          },
        ]
      );
      await queryClient.invalidateQueries({ queryKey: ["assets-search"] });
      await queryClient.invalidateQueries({ queryKey: ["counts"] });
      await queryClient.invalidateQueries({
        queryKey: ["assetPreferencesTypes"],
      });

      notify("success", "Preferences saved successfully");
    } catch (error) {
      notify("error", "Failed to save preferences: " + error);
    } finally {
      setIsSaving(false);
    }
  }, [preferences, queryClient, userDetails]);

  const handleCancel = () => {
    setOpen(false);
    userPreference && dispatch(resetPreferences(userPreference));
  };

  useEffect(() => {
    if (!open || !userPreference) return;
    const pref = userPreference;
    const newPreferences: PreferencesState = {
      assetNames: pref?.assetNames || [],
      assetTypes: pref?.assetTypes || [],
      assetLocations: pref?.assetLocations || [],
      manufactures: pref?.manufactures || [],
      departmentIds: pref?.departmentIds || [userDetails?.deptId].filter(Boolean),
      loaded: true,
    };

    const current = JSON.stringify(preferences);
    const incoming = JSON.stringify(newPreferences);
    if (current !== incoming) {
      dispatch(setPreferences(newPreferences));
    }
  }, [open, userPreference]);

  const renderPreferencesFooter = () => (
    <Space style={{ width: "100%", justifyContent: "space-between" }}>
      <Button onClick={handleCancel}>Cancel</Button>
      <Button
        className="primary-btn"
        onClick={handleSave}
        loading={isSaving}
        disabled={isSaving}
      >
        {isSaving ? "Saving" : "Save"}
      </Button>
    </Space>
  );

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Tooltip title="User Preferences">
        {
          !sm ? 
          <MdRoomPreferences fontSize={20} /> : 
          <Button
          variant="outlined"
          color="cyan"
          className="header-preference-btn"
          name="preferences btn"
          id="preferences-btn"
          onClick={() => setOpen(true)}
        >
          User Preferences
        </Button>
        }
        
      </Tooltip>
      <Drawer
        title="User Preferences"
        width={400}
        onClose={handleCancel}
        footer={renderPreferencesFooter()}
        open={open}
        className="preferences-drawer"
        styles={{ body: { padding: 20, paddingTop: 0 } }}
      >
        <ErrorBoundary fallback={<div>Error loading preferences...</div>}>
          <PreferencesContent
            uniqueValues={uniqueValues}
            isLoading={
              assetPreferencesTypesLoading ||
              userPreferenceLoading ||
              departmentsLoading
            }
            defaultDeptId={userDetails?.deptId}
          />
        </ErrorBoundary>
      </Drawer>
    </Suspense>
  );
});

export default Preferences;
