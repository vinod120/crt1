import { notify } from "@/common/services/notificationService";
import BreadcrumbView from "@/components/breadcrumb/Breadcrumb";
import { useDashboardCountsQuery } from "@/services/queries/countQueries";
import { RootState } from "@/store";
import { useEffect, useState } from "react";
import { IoHome } from "react-icons/io5";
import { useSelector } from "react-redux";
import RecentDashboardTable from "../recentDataTables";
import DashboardCards from "./DashboardCards";

const Dashboard = () => {
  const preferences = useSelector((state: RootState) => state?.preferences);
  const {
    data: counts,
    isLoading: countsLoading,
    isError: countsError,
    error,
  } = useDashboardCountsQuery({
    enabled: preferences?.loaded || false,
    preferences,
  });

  const [selectedCard, setSelectedCard] = useState<string>("recentStudies");

  useEffect(() => {
    if (countsError) {
      const errorMessage =
        (error as Error)?.message ||
        (error as any)?.response?.data?.message ||
        "Failed to fetch dashboard data";
      notify("error", "Dashboard Counts Error", errorMessage);
    }
  }, [countsError, error]);

  return (
    <>
      <BreadcrumbView
        breadcrumbs={[
          {
            title: (
              <div className="breadcrumb-item">
                <IoHome size={15} className="breadcrumb-icon" />
                <span>Home</span>
              </div>
            ),
            key: "",
          },
        ]}
        title="Dashboard"
      />
      <DashboardCards
        counts={countsError ? {} : counts}
        countsLoading={countsLoading}
        selectedCard={selectedCard}
        setSelectedCard={setSelectedCard}
      />
      <RecentDashboardTable selectedCard={selectedCard} />
    </>
  );
};

export default Dashboard;
