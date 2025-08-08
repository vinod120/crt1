import type { FC } from 'react';
import React, { lazy, Suspense } from 'react';
import RecentTableSkeleton from "./RecentTableSkeleton";
import "./RecentTables.css";
const RecentAssets = lazy(() => import('./RecentAssets'));
const RecentStudySetups = lazy(() => import('./RecentStudySetups'));
const RecentStudies = lazy(() => import('./RecentStudies'));
const RecentAuditTrails = lazy(() => import('./RecentAuditTrails'));
const RecentReports = lazy(() => import('./RecentReports'));
const cardComponents: Record<number, React.ComponentType> = {
  1: RecentAssets,
  2: RecentStudySetups,
  3: RecentStudies,
  4: RecentReports,
  5: RecentAuditTrails,
};

interface RecentDashboardTable {
  selectedCard: number;
}

const RecentDashboardTable: FC<RecentDashboardTable> = React.memo(({ selectedCard }) => {
    if (false) {
    return <RecentTableSkeleton />;
  }
  const SelectedComponent = cardComponents[selectedCard] || RecentStudies;
  return (
    <Suspense fallback={<RecentTableSkeleton />}>
        <SelectedComponent />
    </Suspense>
  );
});

export default RecentDashboardTable;