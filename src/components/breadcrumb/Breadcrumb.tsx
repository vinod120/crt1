import { Breadcrumb } from "antd";
import React from "react";
import "./Breadcrumb.css";
import { BreadcrumbViewProps } from "./types";
const items = [
  {
    title: "Home",
  },
  {
    title: "Application Center",
    href: "",
  },
  {
    title: "Application List",
    href: "",
  },
  {
    title: "An Application",
  },
];
const BreadcrumbView: React.FC<BreadcrumbViewProps> = React.memo(
  ({ breadcrumbs = items }) => {
    const breadcrumbItems =
      breadcrumbs?.length > 0
        ? breadcrumbs.map((breadcrumb) => ({
            title: breadcrumb?.title,
            key: breadcrumb?.key,
            onClick: breadcrumb?.onClick,
            menu: breadcrumb?.menu,
          }))
        : undefined;
    return (
      <div className="page-header">
        <div className="page-header-title">
          <h5>Analytics</h5>
        </div>
        <Breadcrumb
          className="breadcrumb"
          separator=">"
          items={breadcrumbItems}
        />
      </div>
    );
  }
);

export default BreadcrumbView;
