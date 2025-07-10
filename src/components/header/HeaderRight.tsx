import { AppDispatch, RootState } from "@/store";
import { toggleTheme } from "@/store/slices/themeSlice";
import {
  ClockCircleOutlined,
  GlobalOutlined,
  MoonOutlined,
  SettingOutlined,
  SunOutlined,
} from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import UserProfile from "../profile/UserProfile";

const HeaderRight: React.FC = () => {
  const themeType = useSelector((state: RootState) => state.theme.theme);
  const dispatch = useDispatch<AppDispatch>();
  const { i18n } = useTranslation();

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

  const languageMenu = [
    {
      key: "en",
      label: "English",
      onClick: () => changeLanguage("en"),
    },
    {
      key: "fr",
      label: "Français",
      onClick: () => changeLanguage("fr"),
    },
  ];

  return (
    <div className="crt-header-right">
      <Space size="middle" align="center">
        <div className="crt-time">
          <ClockCircleOutlined style={{ marginRight: 4 }} />
          <span>{time}</span>
        </div>
        <div className="crt-header-icon">
          <Dropdown menu={{ items: languageMenu }} placement="bottomRight">
            <span role="button" tabIndex={0} aria-label="Toggle Language">
              <GlobalOutlined />
            </span>
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
