import { RootState } from "@/store";
import { Layout } from "antd";
import { useSelector } from "react-redux";
import SimpleBarScroll from "../../scrollbar/SimpleBarScroll";
import "./SideNav.css";
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
      <SimpleBarScroll style={{ height: "calc(100vh - 74px)" }}>
        <div className="crt-sidebar-content">
          <h1>1234r5t</h1>
          <h1>1234r5t</h1>
          <h1>1234r5t</h1>
          <h1>1234r5t</h1>
          <h1>1234r5t</h1>
          <h1>1234r5t</h1>
          <h1>1234r5t</h1>
          <h1>1234r5t</h1>
          <h1>1234r5t</h1>
          <h1>1234r5t</h1>
          <h1>1234r5t</h1>
          <h1>1234r5t</h1>
          <h1>1234r5t</h1>
          <h1>1234r5t</h1>
          <h1>1234r5t</h1>
          <h1>1234r5t</h1>
          <h1>1234r5t</h1>
          <h1>1234r5t</h1>
          <h1>1234r5t</h1>
          <h1>1234r5t</h1>
          <h1>1234r5t</h1>
          <h1>1234r5t</h1>
          <h1>1234r5t</h1>
          <h1>1234r5t</h1>
          <h1>1234r5t</h1>
          <h1>1234r5t</h1>
        </div>
      </SimpleBarScroll>
    </Sider>
  );
};

export default SideNav;
