import BreadcrumbView from "@/components/breadcrumb/Breadcrumb";
import { useState } from "react";
import DashboardCards from "./DashboardCards";

const Dashboard = () => {
  const [selectedCard, setSelectedCard] = useState(1);
  const mockCounts = {
    total_assets: 100,
    total_study_setups: 20,
    study_count: 5,
    report_count: 15,
  };
  const mockBreadcrumbs = [
    { title: "Home", key: "home" },
    { title: "Dashboard", key: "dashboard" },
  ];
  return (
    <>
      <BreadcrumbView breadcrumbs={mockBreadcrumbs} />
      <DashboardCards
        counts={mockCounts}
        countsLoading={false}
        selectedCard={selectedCard}
        setSelectedCard={setSelectedCard}
      />
    </>
  );
};

export default Dashboard;