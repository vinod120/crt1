import "./UserProfile.css";

import {
    LogoutOutlined,
    SettingOutlined,
    ShareAltOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Dropdown, MenuProps, Space } from "antd";
import type { FC } from "react";

const items: MenuProps["items"] = [
  {
    key: "header",
    type: "group",
    label: (
      <div className="dropdown-header">
        <Space>
          <Avatar src={null} size={40} />
          <div>
            <div className="user-profile-title">Test User</div>
            <div className="user-profile-sub-title">testuser@amphenol.com</div>
          </div>
        </Space>
      </div>
    ),
  },
  {
    key: "settings",
    label: (
      <Space size="middle" align="center" className="user-profile-label">
        <SettingOutlined />
        Settings
      </Space>
    ),
  },
  {
    key: "share",
    label: (
      <Space size="middle" align="center" className="user-profile-label">
        <ShareAltOutlined />
        Audit Trail
      </Space>
    ),
  },
  {
    type: "divider",
  },
  {
    key: "logout",
    label: (
      <Button type="text" icon={<LogoutOutlined />} block danger>
        Logout
      </Button>
    ),
  },
];

const UserProfile: FC = () => {
  return (
    <div className="user-profile-container">
      <Dropdown
        menu={{ items }}
        trigger={["click"]}
        placement="bottomRight"
        overlayClassName="user-profile"
      >
        <div className=" crt-header-profile-container">
          <UserOutlined style={{ fontSize: 20, cursor: "pointer" }} />
        </div>
      </Dropdown>
      <div className="user-profile-name">Test User</div>
    </div>
  );
};

export default UserProfile;
