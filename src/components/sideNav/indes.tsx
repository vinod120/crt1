import { RootState } from "@/store";
import {
  UserOutlined
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import "./SideNav.css";
const { Sider } = Layout;

interface SideNavProps {
  collapsed: boolean;
}

const SideNav: React.FC<SideNavProps> = ({ collapsed }) => {
  const themeType = useSelector((state: RootState) => state.theme.theme);
  const [selectedKey, setSelectedKey] = useState("nav");
  const [openKey, setOpenKey] = useState("nav");

  const menuItems = [
    {
      key: "nav",
      label: "NAVIGATION",
      children: [
        { key: "1", label: "Dashboard" },
        { key: "2", label: "Layouts" },
        { key: "3", label: "Widget" },
      ],
    },
    {
      key: "admin",
      label: "ADMIN PANEL",
      children: [
        { key: "4", label: "Online Courses" },
        { key: "5", label: "Membership" },
        { key: "6", label: "Helpdesk" },
        { key: "7", label: "Invoice" },
      ],
    },
    {
      key: "ui",
      label: "UI COMPONENTS",
      children: [
        { key: "8", label: "Advanced" },
        { key: "9", label: "Animation" },
        { key: "10", label: "Icons" },
      ],
    },
    {
      key: "profile",
      label: "User Profile",
      icon: <UserOutlined />,
    },
  ];

  const handleOpenChange = (keys: string[]) => {
    if (keys.length > 0) {
      setSelectedKey(keys[keys.length - 1]);
      setOpenKey(keys[keys.length - 1]);
    } else {
      setOpenKey("");
    }
  };

  return (
    <Sider
      className="custom-sider"
      width={250}
      collapsedWidth={0}
      collapsed={collapsed}
      style={{
        height: "100vh",
        overflow: "hidden",
        position: "fixed",
        left: 0,
        top: 0,
        background: themeType === "dark" ? "#3f4d67" : "#2C3E50",
        boxShadow: themeType === "dark" ? "1px 0 20px 0 #3f4d67" : "none",
        transition: "all 0.3s ease-in-out",
      }}
    >
      <div className="sidebar-logo" style={{ height: 64, padding: 16 }}>
        <img src="https://placehold.co/600x400" alt="logo" style={{ width: 32, height: 32 }} />
        {!collapsed && (
          <span style={{ marginLeft: 8, fontSize: 18, color: "#fff" }}>CRT</span>
        )}
      </div>
      <div style={{ overflow: "auto", height: "calc(100vh - 64px)", scrollbarWidth: "thin" }}>
        <Menu
          theme={themeType}
          mode="inline"
          selectedKeys={[selectedKey]}
          openKeys={[openKey]}
          onOpenChange={handleOpenChange}
          onClick={({ key }) => setSelectedKey(key)}
          items={menuItems}
          style={{ borderRight: 0 }}
        />
      </div>
    </Sider>
  );
};

export default SideNav;