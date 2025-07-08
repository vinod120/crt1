import React from "react";
import "./SidebarHeader.css";

interface SidebarHeaderProps {
  collapsed: boolean;
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({ collapsed }) => {
  return (
    <div className="crt-sidebar-header">
      <img
        src="https://placehold.co/600x400"
        alt="logo"
        className="crt-logo-image"
      />
      {!collapsed && <span className="crt-logo-text">CRT</span>}
    </div>
  );
};

export default SidebarHeader;