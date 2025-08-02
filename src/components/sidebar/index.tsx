import { Layout } from "antd";
import { useState } from "react";
import "./Sidebar.css";
import SidebarHeader from "./SidebarHeader";
import SidebarMenu from "./SidebarMenu";
import SidebarSearch from "./SidebarSearch";
import { SideNavProps } from "./types";
const { Sider } = Layout;

const SideNav: React.FC<SideNavProps> = ({ collapsed }) => {
  const [searchText, setSearchText] = useState("");
  return (
    <Sider
      className="crt-sidebar"
      width={250}
      collapsedWidth={0}
      collapsed={collapsed}
    >
      <SidebarHeader collapsed={collapsed} />
      <SidebarSearch searchText={searchText} setSearchText={setSearchText} />
      <SidebarMenu searchText={searchText} />
    </Sider>
  );
};

export default SideNav;
