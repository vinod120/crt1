import { Breadcrumb } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
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
    const { t } = useTranslation();
    const breadcrumbItems =
      breadcrumbs?.length > 0
        ? breadcrumbs.map((breadcrumb, idx) => ({
            title: breadcrumb?.title,
            key: (breadcrumb as any)?.key ?? breadcrumb?.title ?? idx,
            onClick: (breadcrumb as any)?.onClick,
            menu: (breadcrumb as any)?.menu,
          }))
        : undefined;
    return (
      <div className="breadcrumb-header">
        <div className="breadcrumb-header-title">
          <h5>{t('dashboard')}</h5>
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
