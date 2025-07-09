import { formatNumber } from "@/utils";
import { AppstoreOutlined, ContainerOutlined } from "@ant-design/icons";
import { Card, Col, Row, Skeleton } from "antd";
import type { FC } from "react";
import './DashboardCards.css';
import { DashboardCardsProps } from "./types";

const defaultCards = [
  { id: 1, title: "Assets", key: "total_assets", icon: <AppstoreOutlined style={{ fontSize: '20px' }} /> },
  { id: 2, title: "Study Setup", key: "total_study_setups", icon: <ContainerOutlined style={{ fontSize: '20px' }} /> },
  { id: 3, title: "Study", key: "study_count", icon: <AppstoreOutlined style={{ fontSize: '20px' }} /> },
  { id: 4, title: "Reports", key: "report_count", icon: <AppstoreOutlined style={{ fontSize: '20px' }} /> },
];

const DashboardCards: FC<DashboardCardsProps> = ({
  counts,
  countsLoading,
  selectedCard,
  setSelectedCard,
}) => {
  const getCardCount = (key: string) => formatNumber(counts?.[key] ?? 0);

  return (
    <Row gutter={[16, 16]}>
      {countsLoading
        ? defaultCards.map((card, idx) => (
            <Col key={card.id || idx} xs={24} sm={12} lg={6}>
              <Card className="dashboard-card-container">
                <Skeleton.Input active size="small" block />
              </Card>
            </Col>
          ))
        : defaultCards.map((card, idx) => (
            <Col key={card.id || idx} xs={24} sm={12} lg={6}>
              <Card
                className="dashboard-card-container"
                // onClick={() => setSelectedCard?.(card.key)}
              >
                <div className="dashboard-card-content">
                  <div className="dashboard-card-left">
                    {card.icon}
                    <span className="dashboard-card-title">{card.title}</span>
                  </div>
                  <div className="dashboard-card-count">{getCardCount(card.key)}</div>
                </div>
              </Card>
            </Col>
          ))}
    </Row>
  );
};

export default DashboardCards;

