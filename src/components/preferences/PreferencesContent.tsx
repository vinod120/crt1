import { RootState } from "@/store";
import {
  setAssetLocations,
  setAssetNames,
  setAssetTypes,
  setDepartmentIds,
  setManufactures,
} from '@/store/slices/preferencesSlice';
import { Spin } from 'antd';
import type { FC } from 'react';
import React, { Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const PreferencesSelect = React.lazy(() => import('./PreferencesSelect'));

const PreferencesContent: FC<{
  uniqueValues: {
    assetNames: string[];
    assetLocations: string[];
    manufactures: string[];
    assetTypes: string[];
    departmentIds: { label: string; value: string; disabled?: boolean }[];
  };
  isLoading: boolean;
  defaultDeptId: string | null;
}> = React.memo(({ uniqueValues, isLoading, defaultDeptId }) => {
  const dispatch = useDispatch();
  const preferences = useSelector((state: RootState) => state.preferences);

  const handleDepartmentChange = (value: string[]) => {
    if (defaultDeptId && !value.includes(defaultDeptId)) {
      value = [...value, defaultDeptId];
    }
    dispatch(setDepartmentIds({
      departmentIds: value,
      assetNames: [],
      assetLocations: [],
      manufactures: [],
      assetTypes: [],
      loaded: true
    }));
  };

  const handleAssetNameChange = (value: string[]) => {
    dispatch(setAssetNames({
      ...preferences,
      assetNames: value,
      assetLocations: preferences.assetLocations.filter(loc => uniqueValues.assetLocations.includes(loc)),
      manufactures: preferences.manufactures.filter(man => uniqueValues.manufactures.includes(man)),
      assetTypes: preferences.assetTypes.filter(type => uniqueValues.assetTypes.includes(type)),
    }));
  };

  const handleAssetLocationChange = (value: string[]) => {
    dispatch(setAssetLocations({
      ...preferences,
      assetLocations: value,
      assetNames: preferences.assetNames.filter(name => uniqueValues.assetNames.includes(name)),
      manufactures: preferences.manufactures.filter(man => uniqueValues.manufactures.includes(man)),
      assetTypes: preferences.assetTypes.filter(type => uniqueValues.assetTypes.includes(type)),
    }));
  };

  const handleManufacturesChange = (value: string[]) => {
    dispatch(setManufactures({
      ...preferences,
      manufactures: value,
      assetNames: preferences.assetNames.filter(name => uniqueValues.assetNames.includes(name)),
      assetLocations: preferences.assetLocations.filter(loc => uniqueValues.assetLocations.includes(loc)),
      assetTypes: preferences.assetTypes.filter(type => uniqueValues.assetTypes.includes(type)),
    }));
  };

  const handleAssetTypesChange = (value: string[]) => {
    dispatch(setAssetTypes({
      ...preferences,
      assetTypes: value,
      assetNames: preferences.assetNames.filter(name => uniqueValues.assetNames.includes(name)),
      assetLocations: preferences.assetLocations.filter(loc => uniqueValues.assetLocations.includes(loc)),
      manufactures: preferences.manufactures.filter(man => uniqueValues.manufactures.includes(man)),
    }));
  };

  const renderLabel = (label: string, count: number) => (
    <span className="label-container">
      {label} <span className="normal-text">({count})</span>
    </span>
  );

  return (
    <Suspense fallback={<div>Loading preferences...</div>}>
      <Spin spinning={isLoading}>
        <PreferencesSelect
          label={renderLabel('Departments', uniqueValues?.departmentIds?.length)}
          mode="multiple"
          options={uniqueValues?.departmentIds}
          placeholder="Select Departments"
          value={preferences?.departmentIds}
          onChange={handleDepartmentChange}
        />
        <PreferencesSelect
          label={renderLabel('Asset Names', uniqueValues?.assetNames?.length)}
          mode="multiple"
          options={uniqueValues?.assetNames}
          placeholder="Select Asset Names"
          value={preferences?.assetNames}
          onChange={handleAssetNameChange}
        />
        <PreferencesSelect
          label={renderLabel('Locations', uniqueValues?.assetLocations?.length)}
          mode="multiple"
          options={uniqueValues?.assetLocations}
          placeholder="Select Locations"
          value={preferences.assetLocations}
          onChange={handleAssetLocationChange}
        />
        <PreferencesSelect
          label={renderLabel('Manufacturers', uniqueValues?.manufactures?.length)}
          mode="multiple"
          options={uniqueValues?.manufactures}
          placeholder="Select Manufacturers"
          value={preferences.manufactures}
          onChange={handleManufacturesChange}
        />
        <PreferencesSelect
          label={renderLabel('Asset Types', uniqueValues?.assetTypes?.length)}
          mode="multiple"
          options={uniqueValues?.assetTypes}
          placeholder="Select Types"
          value={preferences.assetTypes}
          onChange={handleAssetTypesChange}
        />
      </Spin>
    </Suspense>
  );
});

export default PreferencesContent;
