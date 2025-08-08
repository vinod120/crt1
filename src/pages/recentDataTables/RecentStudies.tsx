import { useRecentStudiesByPreferencesQuery } from "@/services/queries/studyQueries";
import { RootState } from "@/store";
import { getDateFormat } from "@/utils";
import type { TableColumnsType } from "antd";
import { Tooltip } from "antd";
import React from "react";
import { FaEye } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import RecentTable from "./RecentTable";

interface RecentStudyTypes {
  assetName: string;
  setupName: string;
  assetId: string;
  studyId: string;
  studyStartDate: Date;
  studyStartedByUserId: string;
  studyFileComment: string;
  studyType: string;
  deptName: string;
}
const columns: TableColumnsType<RecentStudyTypes> = [
  {
    title: "Action",
    dataIndex: "viewDetails",
    render: (_, record) => (
      <Link to={`/studies/vrt/${record?.assetId}/${record?.studyId}`}>
        <Tooltip title="View Study Details">
          <FaEye />
        </Tooltip>
      </Link>
    ),
  },
  {
    title: "Asset Name",
    dataIndex: "assetName",
    sorter: (a, b) => a?.assetName?.localeCompare(b?.assetName),
  },
  {
    title: "Study Name",
    dataIndex: "setupName",
    sorter: (a, b) => a?.setupName?.localeCompare(b?.setupName),
  },
  {
    title: "Study Start Date",
    render: (row) => getDateFormat(row),
    dataIndex: "studyStartDate",
    sorter: (a, b) =>
      new Date(a?.studyStartDate)?.getTime() -
      new Date(b?.studyStartDate)?.getTime(),
  },
  {
    title: "Study Started By",
    dataIndex: "studyStartedByUserId",
    sorter: (a, b) =>
      a?.studyStartedByUserId?.localeCompare(b?.studyStartedByUserId),
    render: (row) => (
      <Tooltip title={row}>
        <div className="ellipsis-cell">{row}</div>
      </Tooltip>
    ),
  },
  {
    title: "Comments",
    dataIndex: "studyFileComment",
    sorter: (a, b) => a?.studyFileComment?.localeCompare(b?.studyFileComment),
    render: (row) => (
      <Tooltip title={row}>
        <div className="ellipsis-cell">{row}</div>
      </Tooltip>
    ),
  },
  {
    title: "Study Type",
    dataIndex: "studyType",
    sorter: (a, b) => a?.studyType?.localeCompare(b?.studyType),
  },
  {
    title: "Product Type",
    dataIndex: "productType",
    render: () => "VRT",
  },
  {
    title: "Department",
    dataIndex: "deptName",
    sorter: (a, b) => a?.deptName?.localeCompare(b?.deptName),
  },
];

const RecentStudies: React.FC = () => {
  const preferences = useSelector((state: RootState) => state.preferences);
  const {
    data: topStudies,
    isLoading,
    isError,
  } = useRecentStudiesByPreferencesQuery({
    enabled: preferences?.loaded || false,
    preferences,
  });

  const dataSource = Array.isArray(topStudies) ? topStudies : [];

  return (
    <RecentTable<RecentStudyTypes>
      title="Recent Studies"
      columns={columns}
      data={dataSource}
      rowKey="studyStartDate"
      loading={isLoading}
    />
  );
};

export default RecentStudies;
