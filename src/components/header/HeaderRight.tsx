import { AppDispatch, RootState } from "@/store";
import { toggleTheme } from "@/store/slices/themeSlice";
import {
  ClockCircleOutlined,
  GlobalOutlined,
  MoonOutlined,
  SettingOutlined,
  SunOutlined,
} from "@ant-design/icons";
import { Dropdown, Space } from "antd"; // Dropdown might not be needed here anymore unless other settings use it
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import UserProfile from "../profile/UserProfile";
import SettingsPanel from "../settingsPanel/SettingsPanel"; // Import the SettingsPanel

const HeaderRight: React.FC = () => {
  const themeType = useSelector((state: RootState) => state.theme.theme);
  const dispatch = useDispatch<AppDispatch>();
  const { i18n } = useTranslation();

  const [time, setTime] = useState(() => new Date().toLocaleTimeString());
  const [isSettingsPanelVisible, setIsSettingsPanelVisible] = useState(false); // State for panel visibility

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

  const showSettingsPanel = () => {
    setIsSettingsPanelVisible(true);
  };

  const hideSettingsPanel = () => {
    setIsSettingsPanelVisible(false);
  };

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
          >
            {themeType === "light" ? <SunOutlined /> : <MoonOutlined />}
          </span>
        </div>
        <div className="crt-header-icon">
          <span
            role="button"
            tabIndex={0}
            aria-label="Open Theme Customizer"
            onClick={showSettingsPanel} // Open the panel
          >
            <SettingOutlined />
          </span>
        </div>
        <UserProfile />
      </Space>
      <SettingsPanel visible={isSettingsPanelVisible} onClose={hideSettingsPanel} />
    </div>
  );
};

export default HeaderRight;
