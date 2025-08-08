import type { TableColumnsType } from "antd";
import { Card, Table } from "antd";

type RecentTableProps<T> = {
  title: string;
  columns: TableColumnsType<T>;
  data: T[];
  rowKey: string;
  loading: boolean;
};

const RecentTable = <T,>({
  title,
  columns,
  data,
  rowKey,
  loading,
}: RecentTableProps<T>) => (
  <Card title={title} className="dashboard-card-container" id="recent-tables-card-header">
    <div style={{ minHeight: 350, overflow: 'hidden' }}>
      <Table<T>
        columns={columns}
        dataSource={data}
        rowKey={rowKey}
        scroll={{ x: 'max-content'}}
        className="crt-table"
        pagination={false}
        loading={loading}
        tableLayout="fixed"
      />
    </div>
  </Card>
);

export default RecentTable;