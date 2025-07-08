import BreadcrumbView from "@/components/breadcrumb/Breadcrumb";
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Card, Col, Progress, Row } from 'antd';

const Dashboard = () => {
  return (
    <>
      <BreadcrumbView />
      <Row gutter={16}>
        <Col span={8}>
          <Card title="Daily Sales">
            <p>$249.95</p>
            <p>67% <ArrowUpOutlined style={{ color: 'green' }} /></p>
            <Progress percent={67} strokeColor="green" />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Monthly Sales">
            <p>$2,942.32</p>
            <p>36% <ArrowDownOutlined style={{ color: 'red' }} /></p>
            <Progress percent={36} strokeColor="red" />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Yearly Sales">
            <p>$8,638.32</p>
            <p>80% <ArrowUpOutlined style={{ color: 'green' }} /></p>
            <Progress percent={80} strokeColor="green" />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Dashboard;