import { FC, Suspense, lazy } from "react";
import RecentTableSkeleton from "./RecentTableSkeleton";
const RecentAssets = lazy(() => import("./RecentAssets"));
const RecentAuditTrails = lazy(() => import("./RecentAuditTrails"));
const RecentReports = lazy(() => import("./RecentReports"));
const RecentStudies = lazy(() => import("./RecentStudies"));
const RecentStudySetups = lazy(() => import("./RecentStudySetups"));

interface Props {
  selectedCard: string;
}

const RecentDashboardTable: FC<Props> = ({ selectedCard }) => {
  const renderSelectedComponent = () => {
    switch (selectedCard) {
      case "recentAssets":
        return <RecentAssets />;
      case "recentAuditTrails":
        return <RecentAuditTrails />;
      case "recentReports":
        return <RecentReports />;
      case "recentStudies":
        return <RecentStudies />;
      case "recentStudySetups":
        return <RecentStudySetups />;
      default:
        return null;
    }
  };

  return <Suspense fallback={<RecentTableSkeleton />}>{renderSelectedComponent()}</Suspense>;
};

export default RecentDashboardTable;
