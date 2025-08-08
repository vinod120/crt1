import { useRecentSetupsByPreferencesQuery } from "@/services/queries/setupQueries";
import { RootState } from "@/store";
import { getDateFormat } from "@/utils";
import type { TableColumnsType } from "antd";
import { Tooltip } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import RecentTable from "./RecentTable";

interface RecentStudySetupTypes {
  assetName: string;
  setupName: string;
  setupCreationDate: Date;
  userName: string;
  comment: string;
  deptName: string;
}

const columns: TableColumnsType<RecentStudySetupTypes> = [
  {
    title: "Asset Name",
    dataIndex: "assetName",
    sorter: (a, b) => a?.assetName?.localeCompare(b?.assetName),
  },
  {
    title: "Setup Name",
    dataIndex: "setupName",
    sorter: (a, b) => a?.setupName?.localeCompare(b?.setupName),
  },
  {
    title: "Setup Creation Date",
    render: (row) => getDateFormat(row),
    dataIndex: "setupCreationDate",
    sorter: (a, b) =>
      new Date(a?.setupCreationDate)?.getTime() -
      new Date(b?.setupCreationDate)?.getTime(),
  },
  {
    title: "Setup Created By",
    dataIndex: "userName",
    sorter: (a, b) => a?.userName?.localeCompare(b?.userName),
    render: (row) => (
      <Tooltip title={row}>
        <div className="ellipsis-cell">{row}</div>
      </Tooltip>
    ),
  },
  {
    title: "Comments",
    dataIndex: "comment",
    sorter: (a, b) => a?.comment?.localeCompare(b?.comment),
    render: (row) => (
      <Tooltip title={row}>
        <div className="ellipsis-cell">{row}</div>
      </Tooltip>
    ),
  },
  { title: "Product Type", dataIndex: "productType", render: () => "VRT" },
  {
    title: "Department",
    dataIndex: "deptName",
    sorter: (a, b) => a?.deptName?.localeCompare(b?.deptName),
  },
];

const RecentStudySetups: React.FC = () => {
  const preferences = useSelector((state: RootState) => state.preferences);
  const { data, isLoading, isError } = useRecentSetupsByPreferencesQuery({
    enabled: preferences?.loaded || false,
    preferences,
  });

  const dataSource = Array.isArray(data) && !isError ? data : [];

  return (
    <RecentTable<RecentStudySetupTypes>
      title="Recent Study Setups"
      columns={columns}
      data={dataSource}
      rowKey="setupCreationDate"
      loading={isLoading}
    />
  );
};

export default RecentStudySetups;
