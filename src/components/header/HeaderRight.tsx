import { AppDispatch, RootState } from "@/store";
import { toggleTheme } from "@/store/slices/themeSlice";
import {
  ClockCircleOutlined,
  MoonOutlined,
  SettingOutlined,
  SunOutlined,
  GlobalOutlined, // Icon for language switcher
} from "@ant-design/icons";
import { Space, Dropdown, Button, Menu } from "antd"; // Added Dropdown, Button, Menu
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserProfile from "../profile/UserProfile";
import { useTranslation } from "react-i18next"; // Import useTranslation

const HeaderRight: React.FC = () => {
  const themeType = useSelector((state: RootState) => state.theme.theme);
  const dispatch = useDispatch<AppDispatch>();
  const { i18n } = useTranslation(); // Hook for i18n

  const [time, setTime] = useState(() => new Date().toLocaleTimeString());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const languageMenu = (
    <Menu>
      <Menu.Item key="en" onClick={() => changeLanguage('en')}>
        English
      </Menu.Item>
      <Menu.Item key="fr" onClick={() => changeLanguage('fr')}>
        Français
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="crt-header-right">
      <Space size="middle" align="center">
        <div className="crt-time">
          <ClockCircleOutlined style={{ marginRight: 4 }} />
          <span>{time}</span>
        </div>
        <div className="crt-header-icon">
          <Dropdown overlay={languageMenu} placement="bottomRight">
            <Button type="text" icon={<GlobalOutlined />} className="crt-header-icon" />
          </Dropdown>
        </div>
        <div className="crt-header-icon">
          <span
            role="button"
            tabIndex={0}
            aria-label="Toggle Theme"
            onClick={() => dispatch(toggleTheme())}
            className="crt-header-icon"
          >
            {themeType === "light" ? <SunOutlined /> : <MoonOutlined />}
          </span>
        </div>
        <div className="crt-header-icon">
          <SettingOutlined />
        </div>
        <UserProfile />
      </Space>
    </div>
  );
};

export default HeaderRight;
