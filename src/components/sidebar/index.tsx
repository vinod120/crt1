import { RootState } from "@/store";
import { Layout } from "antd";
import { useSelector } from "react-redux";
import SidebarMenu from "../SidebarMenu";
import "./Sidebar.css";
import SidebarHeader from "./SidebarHeader";
const { Sider } = Layout;
interface SideNavProps {
  collapsed: boolean;
}

const SideNav: React.FC<SideNavProps> = ({ collapsed }) => {
  const themeType = useSelector((state: RootState) => state.theme.theme);
  return (
    <Sider
      className="crt-sidebar"
      width={250}
      collapsedWidth={0}
      collapsed={collapsed}
    >
      <SidebarHeader collapsed={collapsed} />
      <SidebarMenu collapsed={collapsed} />
    </Sider>
  );
};

export default SideNav;
