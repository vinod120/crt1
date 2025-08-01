import { Layout } from "antd";
import "./Sidebar.css";
import SidebarHeader from "./SidebarHeader";
import SidebarMenu from "./SidebarMenu";
import SidebarSearch from "./SidebarSearch";
const { Sider } = Layout;
interface SideNavProps {
  collapsed: boolean;
}

const SideNav: React.FC<SideNavProps> = ({ collapsed }) => {
  return (
    <Sider
      className="crt-sidebar"
      width={250}
      collapsedWidth={0}
      collapsed={collapsed}
    >
      <SidebarHeader collapsed={collapsed} />
      <SidebarSearch />
      <SidebarMenu collapsed={collapsed} />
    </Sider>
  );
};

export default SideNav;
