import { getDateFormat } from "@/utils";
import type { TableColumnsType } from "antd";
import { Tooltip } from "antd";
import React from "react";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import RecentTable from "../recentDataTables/RecentTable";

interface StudyType {
  studyId: string;
  setupName: string;
  studyStartDate: string;
  studyType: string;
  studyStartedByUserId: string;
  userName: string;
  setupCreationDate: Date;
  [key: string]: any;
}

interface StudyTableProps {
  data: StudyType[];
  loading: boolean;
  assetId: string;
  allStudies: StudyType[]
}

const StudyTable = React.memo(({ data, loading, assetId, allStudies }: StudyTableProps) => {
  const studyColumns: TableColumnsType<StudyType> = [
    {
      title: "Action",
      dataIndex: "action",
      render: (_: any, record: StudyType) => {
        const token = btoa(
          JSON.stringify({
            studyId: record?.studyId,
            qualStudyType: record?.qualStudyType,
            qualStudySerialNo: record?.qualStudySerialNo,
          })
        );

      return (  <div className="study-table-actions">
          <Tooltip title="Study Details">
            <Link
              to={`/studies/vrt/${assetId}/${token}`}
              state={{allStudies}}
              >
              <FaEye style={{ cursor: "pointer" }} />
            </Link>
          </Tooltip>
          <Tooltip title="Reports">
            <Link to={`/reports/${assetId}/${record.studyId}`}>
              <FaEye style={{ cursor: "pointer", marginLeft: 12 }} />
            </Link>
          </Tooltip>
        </div>
)},
    },
    {
      title: "Study Name",
      dataIndex: "setupName",
      sorter: (a, b) => a.setupName?.localeCompare(b.setupName),
    },
    {
      title: "Study Type",
      dataIndex: "studyType",
      sorter: (a, b) => a.studyType?.localeCompare(b.studyType),
    },
    {
      title: "Study Start Date",
      dataIndex: "studyStartDate",
      render: (date: string) => getDateFormat(date),
      sorter: (a, b) =>
        new Date(a.studyStartDate).getTime() -
        new Date(b.studyStartDate).getTime(),
    },
    {
      title: "Study Started By",
      dataIndex: "studyStartedByUserId",
      sorter: (a, b) =>
        a.studyStartedByUserId?.localeCompare(b.studyStartedByUserId),
    },
    {
      title: "Setup Created/Modified By",
      dataIndex: "userName",
      sorter: (a, b) => a.userName?.localeCompare(b.userName),
    },
    {
      title: "Setup Creation Date",
      dataIndex: "setupCreationDate",
      render: (date: string) => getDateFormat(date),
      sorter: (a, b) =>
        new Date(a.setupCreationDate).getTime() -
        new Date(b.setupCreationDate).getTime(),
    },
    {
      title: "Product Type",
      dataIndex: "productType",
      render: () => "VRT",
    },
  ];

  return (
    <RecentTable<StudyType>
      title=""
      columns={studyColumns}
      data={data}
      rowKey="studyId"
      loading={loading}
    />
  );
});

export default StudyTable;
