import { useRecentAssetsByPreferencesQuery } from "@/services/queries/assetQueries";
import { RootState } from "@/store";
import type { TableColumnsType } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import RecentTable from "./RecentTable";

interface RecentAssetTypes {
  assetName: string;
  assetTypeName: string;
  location: string;
  manufacturer: string;
  createdByUser: string;
  modifiedByProductType: string;
}
const columns: TableColumnsType<RecentAssetTypes> = [
  {
    title: "Asset Name",
    dataIndex: "assetName",
    sorter: (a, b) => a?.assetName?.localeCompare(b?.assetName),
  },
  {
    title: "Asset Type",
    dataIndex: "assetTypeName",
    sorter: (a, b) => a?.assetTypeName?.localeCompare(b?.assetTypeName),
  },
  {
    title: "Location",
    dataIndex: "location",
    sorter: (a, b) => a?.location?.localeCompare(b?.location),
  },
  {
    title: "Manufacturer",
    dataIndex: "manufacturer",
    sorter: (a, b) => a?.manufacturer?.localeCompare(b?.manufacturer),
  },
  {
    title: "Created By",
    dataIndex: "createdByUser",
    sorter: (a, b) => a?.createdByUser?.localeCompare(b?.createdByUser),
  },
  {
    title: "Product Type",
    dataIndex: "modifiedByProductType",
    sorter: (a, b) =>
      a?.modifiedByProductType?.localeCompare(b?.modifiedByProductType),
    render: (row) => row?.toUpperCase(),
  },
];

const RecentAssets: React.FC = () => {
  const preferences = useSelector((state: RootState) => state.preferences);
  const { data, isLoading, isError } = useRecentAssetsByPreferencesQuery({
    enabled: preferences?.loaded || false,
    preferences,
  });

  const dataSource = Array.isArray(data) && !isError ? data : [];

  return (
    <RecentTable<RecentAssetTypes>
      title="Recent Assets"
      columns={columns}
      data={dataSource}
      rowKey="lastModifiedInTbl"
      loading={isLoading}
    />
  );
};

export default RecentAssets;
