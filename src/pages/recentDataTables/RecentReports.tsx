import { useTopReportsQuery } from "@/services/queries/reportQueries";
import { getDateFormat, getReportPdfUrl, reportTypeStyles } from "@/utils";
import type { TableColumnsType } from "antd";
import { Button } from "antd";
import React from "react";
import RecentTable from "./RecentTable";

interface RecentReportTypes {
  path: string;
  fileName: string;
  studyName: string;
  creationdatetime: Date;
  fileType: string;
}
const columns: TableColumnsType<RecentReportTypes> = [
  {
    title: "Action",
    dataIndex: "viewReport",
    render: (_, record) => (
      <Button
        type="primary"
        onClick={() =>
          window.open(
            getReportPdfUrl(`${record?.path}/${record?.fileName}`),
            "_blank"
          )
        }
      >
        View Report
      </Button>
    ),
  },
  {
    title: "Study Name",
    dataIndex: "studyName",
    sorter: (a, b) => a?.studyName?.localeCompare(b?.studyName),
  },
  {
    title: "Creation Date",
    render: (row) => getDateFormat(row),
    dataIndex: "creationdatetime",
    sorter: (a, b) =>
      new Date(a?.creationdatetime)?.getTime() -
      new Date(b?.creationdatetime)?.getTime(),
  },
  {
    title: "File Type",
    dataIndex: "fileType",
    sorter: (a, b) => a?.fileType?.localeCompare(b?.fileType),
    render: (fileType: string) => {
      const { symbol } = reportTypeStyles[fileType] || { symbol: "?" };
      return <div>{symbol}</div>;
    },
  },
  { title: "Product Type", dataIndex: "productType", render: () => "VRT" },
];

const RecentAssets: React.FC = () => {
  const { data, isLoading, isError } = useTopReportsQuery();

  const dataSource = Array.isArray(data) && !isError ? data : [];

  return (
    <RecentTable<RecentReportTypes>
      title="Recent Reports"
      columns={columns}
      data={dataSource}
      rowKey="creationdatetime"
      loading={isLoading}
    />
  );
};

export default RecentAssets;
