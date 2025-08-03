import "./UserProfile.css";

import {
  LogoutOutlined,
  SettingOutlined,
  ShareAltOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Dropdown, MenuProps, Space } from "antd";
import type { FC } from "react";
import { useTranslation } from "react-i18next";

const items = (t: any): MenuProps["items"] => [
  {
    key: "header",
    type: "group",
    label: (
      <div className="dropdown-header">
        <Space>
          <Avatar src={null} size={40} />
          <div>
            <div className="user-profile-title">{t("testUser")}</div>
            <div className="user-profile-sub-title">{t("testUserEmail")}</div>
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
        {t("settings")}
      </Space>
    ),
  },
  {
    key: "share",
    label: (
      <Space size="middle" align="center" className="user-profile-label">
        <ShareAltOutlined />
        {t("auditTrail")}
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
        {t("logout")}
      </Button>
    ),
  },
];

const UserProfile: FC = () => {
  const { t } = useTranslation();
  return (
    <div className="user-profile-container">
      <Dropdown
        menu={{ items: items(t) }}
        trigger={["click"]}
        placement="bottomRight"
        overlayClassName="user-profile"
      >
        <div className=" crt-header-profile-container">
          <UserOutlined style={{ fontSize: 20, cursor: "pointer" }} />
        </div>
      </Dropdown>
      <div className="user-profile-name">{t("testUser")}</div>
    </div>
  );
};

export default UserProfile;
