import { Breadcrumb } from "antd";
import React from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import "./Breadcrumb.css";
import { BreadcrumbViewProps } from "./types";
import { useTranslation } from "react-i18next";

const BreadcrumbView: React.FC<BreadcrumbViewProps> = React.memo(
  ({ breadcrumbs, title }) => {
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
          <h5>{t(title || 'dashboard')}</h5>
        </div>
        <Breadcrumb
          className="breadcrumb"
          separator={<MdKeyboardArrowRight fontSize={20} />}
          items={breadcrumbItems}
        />
      </div>
    );
  }
);

export default BreadcrumbView;
