import { Skeleton } from 'antd';
import type { FC } from 'react';
import React from "react";

const RecentTableSkeleton: FC = React.memo(() => (
  <div className="dashboard-table-skeleton">
    <div className="dashboard-table-skeleton-header">
      <Skeleton active title={false} paragraph={{ rows: 1, width: '94%' }} />
    </div>
    <div className="dashboard-table-skeleton-rows">
      {[1, 2, 3, 4, 5, 6, 7].map((index) => (
        <div key={index} className="dashboard-table-skeleton-row">
          <Skeleton.Input className="skeleton-input-15" active />
          <Skeleton.Input className="skeleton-input-25" active />
          <Skeleton.Input className="skeleton-input-20" active />
          <Skeleton.Input className="skeleton-input-20" active />
          <Skeleton.Input className="skeleton-input-20" active />
          <Skeleton.Input className="skeleton-input-20" active />
        </div>
      ))}
    </div>
  </div>
));

export default RecentTableSkeleton;