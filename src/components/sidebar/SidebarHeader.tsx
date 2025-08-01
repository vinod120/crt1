import { Image } from "antd";
import React from "react";
import kayeLogo from "../../assets/kayeLogo.svg";
import "./SidebarHeader.css";

interface SidebarHeaderProps {
  collapsed: boolean;
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({ collapsed }) => {
  return (
    <div className="crt-sidebar-header">
      <Image
        width={200}
        src={kayeLogo}
        preview={false}
        height="auto"
        style={{ objectFit: "contain", width: 220 }}
        alt="Kaye Logo"
      />
    </div>
  );
};

export default SidebarHeader;