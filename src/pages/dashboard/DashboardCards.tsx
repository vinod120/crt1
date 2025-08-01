import { formatNumber } from "@/utils";
import {
  AppstoreOutlined,
  ContainerOutlined,
} from "@ant-design/icons";
import { Card, Col, Row, Skeleton } from "antd";
import type { FC } from "react";
import "./DashboardCards.css";
import { DashboardCardsProps } from "./types";

const defaultCards = [
  {
    id: 1,
    title: "Assets",
    key: "assetCount",
    icon: <AppstoreOutlined style={{ fontSize: "20px" }} />,
  },
  {
    id: 2,
    title: "Study Setup",
    key: "setupCount",
    icon: <ContainerOutlined style={{ fontSize: "20px" }} />,
  },
  {
    id: 3,
    title: "Study",
    key: "studyCount",
    icon: <AppstoreOutlined style={{ fontSize: "20px" }} />,
  },
  {
    id: 4,
    title: "Reports",
    key: "reportCount",
    icon: <AppstoreOutlined style={{ fontSize: "20px" }} />,
  },
  {
    id: 5,
    title: "Audit Trail",
    key: "auditTrail",
    icon: <AppstoreOutlined style={{ fontSize: "20px" }} />,
  },
];

const renderSkeleton = () =>
  defaultCards.map((card) => (
    <Col key={card.id} xs={24} sm={12} md={8} lg={6} xl={4} style={{ flex: "0 0 20%", maxWidth: "20%" }}>
      <Card className="dashboard-card-container">
        <Skeleton.Input active size="default" block />
      </Card>
    </Col>
  ));

const DashboardCards: FC<DashboardCardsProps> = ({
  counts,
  countsLoading,
  selectedCard,
  setSelectedCard,
}) => {
  const renderCards = () => {
    return defaultCards.map((card) => (
      <Col key={card.id} xs={24} sm={12} md={8} lg={6} xl={4} style={{ flex: "0 0 20%", maxWidth: "20%" }}>
        <Card
          className={`dashboard-card-container ${
            selectedCard === card.key ? "selected" : ""
          }`}
          onClick={() => setSelectedCard?.(card.key)}
        >
          <div className="dashboard-card-content sub-headline">
            <div className="dashboard-card-left">
              {card.icon}
              <span>{card.title}</span>
            </div>
            <div>
              {formatNumber(counts?.[card.key] ?? 0)}
            </div>
          </div>
        </Card>
      </Col>
    ));
  };

  return <Row gutter={[16, 16]}>{countsLoading ? renderSkeleton() : renderCards()}</Row>;
};

export default DashboardCards;
