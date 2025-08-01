import { notify } from "@/common/services/notificationService";
import BreadcrumbView from "@/components/breadcrumb/Breadcrumb";
import { useDashboardCountsQuery } from "@/services/queries/countQueries";
import { RootState } from "@/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DashboardCards from "./DashboardCards";

const Dashboard = () => {
  const preferences = useSelector((state: RootState) => state?.preferences);
  const {
    data: counts,
    isLoading: countsLoading,
    isError: countsError,
    error,
  } = useDashboardCountsQuery({
    enabled: preferences?.loaded,
    preferences,
  });

  const [selectedCard, setSelectedCard] = useState<string | null>(null);

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
      <BreadcrumbView />
      <DashboardCards
        counts={countsError ? {} : counts}
        countsLoading={countsLoading}
        selectedCard={selectedCard}
        setSelectedCard={setSelectedCard}
      />
      </>
  );
};

export default Dashboard;
