import { formatNumber } from "@/utils";
import {
  AppstoreOutlined,
  ContainerOutlined,
} from "@ant-design/icons";
import { Card, Skeleton } from "antd";
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
    <div key={card.id} className="dashboard-card-wrapper">
      <Card className="dashboard-card-container">
        <Skeleton.Input active size="default" block />
      </Card>
    </div>
  ));

const DashboardCards: FC<DashboardCardsProps> = ({
  counts,
  countsLoading,
  selectedCard,
  setSelectedCard,
}) => {
  const renderCards = () => {
    return defaultCards.map((card) => (
      <div
        key={card?.id}
        className={`dashboard-card-wrapper ${selectedCard === card?.key ? "selected" : ""}`}
        onClick={() => setSelectedCard?.(card?.key)}
      >
        <Card className="dashboard-card-container">
          <div className="dashboard-card-content sub-headline">
            <div className="dashboard-card-left">
              {card?.icon}
              <span>{card?.title}</span>
            </div>
            <div className="dashboard-card-count">
              {formatNumber(counts?.[card?.key] ?? 0)}
            </div>
          </div>
        </Card>
      </div>
    ));
  };

  return <div className="dashboard-card-row">{countsLoading ? renderSkeleton() : renderCards()}</div>;
};

export default DashboardCards;
