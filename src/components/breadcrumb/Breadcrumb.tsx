import { Breadcrumb } from "antd";
import React from "react";
import "./Breadcrumb.css";
import { BreadcrumbViewProps } from "./types";
import { useTranslation } from "react-i18next"; // Import useTranslation

const items = [
  {
    title: "Home", // This could also be translated if needed
  },
  {
    title: "Application Center", // This could also be translated if needed
    href: "",
  },
  {
    title: "Application List", // This could also be translated if needed
    href: "",
  },
  {
    title: "An Application", // This could also be translated if needed
  },
];

const BreadcrumbView: React.FC<BreadcrumbViewProps> = React.memo(
  ({ breadcrumbs = items }) => {
    const { t } = useTranslation(); // Initialize useTranslation
    const breadcrumbItems =
      breadcrumbs?.length > 0
        ? breadcrumbs.map((breadcrumb, idx) => ({
            title: breadcrumb?.title, // If breadcrumb titles come from a dynamic source, they should be translated there
            key: (breadcrumb as any)?.key ?? breadcrumb?.title ?? idx,
            onClick: (breadcrumb as any)?.onClick,
            menu: (breadcrumb as any)?.menu,
          }))
        : undefined;
    return (
      <div className="breadcrumb-header">
        <div className="breadcrumb-header-title">
          <h5>{t('dashboard')}</h5> {/* Translate "Dashboard" */}
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
