import { formatNumber } from "@/utils";
import { AppstoreOutlined, ContainerOutlined } from "@ant-design/icons";
import { Card, Skeleton } from "antd";
import type { FC } from "react";
import { useTranslation } from "react-i18next";
import "./DashboardCards.css";
import { DashboardCardsProps } from "./types";

const defaultCards = (t: any) => [
  {
    id: 1,
    title: t("assets"),
    key: "assetCount",
    icon: <AppstoreOutlined style={{ fontSize: "20px" }} />,
  },
  {
    id: 2,
    title: t("studySetup"),
    key: "setupCount",
    icon: <ContainerOutlined style={{ fontSize: "20px" }} />,
  },
  {
    id: 3,
    title: t("study"),
    key: "studyCount",
    icon: <AppstoreOutlined style={{ fontSize: "20px" }} />,
  },
  {
    id: 4,
    title: t("reports"),
    key: "reportCount",
    icon: <AppstoreOutlined style={{ fontSize: "20px" }} />,
  },
  {
    id: 5,
    title: t("auditTrail"),
    key: "auditTrail",
    icon: <AppstoreOutlined style={{ fontSize: "20px" }} />,
  },
];

const renderSkeleton = (t: any) =>
  defaultCards(t).map((card) => (
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
  const { t } = useTranslation();
  const renderCards = () => {
    return defaultCards(t).map((card) => (
      <div
        key={card?.id}
        className={`dashboard-card-wrapper ${
          selectedCard === card?.key ? "selected" : ""
        }`}
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

  return (
    <div className="dashboard-card-row">
      {countsLoading ? renderSkeleton(t) : renderCards()}
    </div>
  );
};

export default DashboardCards;
