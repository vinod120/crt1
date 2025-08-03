import { AppDispatch, RootState } from "@/store";
import { toggleTheme } from "@/store/slices/themeSlice";
import { Button, Dropdown, Space, Tooltip } from "antd";
import useBreakpoint from "antd/es/grid/hooks/useBreakpoint";
import React, { lazy, Suspense, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  AiFillClockCircle,
  AiFillMoon,
  AiFillSun,
  AiOutlineGlobal,
  AiTwotoneSetting,
} from "react-icons/ai";
import { BiSolidReport } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";

import UserProfile from "../profile/UserProfile";
import SettingsPanel from "../settingsPanel/SettingsPanel";
const Preferences  = lazy(() => import("../preferences/Preferences"))

const HeaderRight: React.FC = () => {
  const { sm } = useBreakpoint();
  const themeType = useSelector((state: RootState) => state.theme.theme);
  const dispatch = useDispatch<AppDispatch>();
  const { i18n } = useTranslation();

  const [time, setTime] = useState(() => new Date().toLocaleTimeString());
  const [isSettingsPanelVisible, setIsSettingsPanelVisible] = useState(false);

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
        {sm && (
          <Tooltip title={time} className="crt-time">
            <AiFillClockCircle
              style={{ marginRight: 4 }}
              fontSize={20}
              className="header-right-icon"
            />
            <span>{time}</span>
          </Tooltip>
        )}
        <Tooltip className="crt-header-icon">
          <Dropdown menu={{ items: languageMenu }} placement="bottomRight">
            <span role="button" tabIndex={0} aria-label="Toggle Language">
              <AiOutlineGlobal fontSize={20} className="header-right-icon" />
            </span>
          </Dropdown>
        </Tooltip>
        <Tooltip
          title={themeType === "light" ? "Light Theme" : "Dark Theme"}
          className="crt-header-icon"
        >
          <span
            role="button"
            tabIndex={0}
            aria-label="Toggle Theme"
            onClick={() => dispatch(toggleTheme())}
          >
            {themeType === "light" ? (
              <AiFillSun fontSize={20} className="header-right-icon" />
            ) : (
              <AiFillMoon fontSize={20} className="header-right-icon" />
            )}
          </span>
        </Tooltip>
        <Tooltip title="settings" className="crt-header-icon">
          <span
            role="button"
            tabIndex={0}
            aria-label="Open Theme Customizer"
            onClick={showSettingsPanel}
          >
            <AiTwotoneSetting fontSize={20} className="header-right-icon" />
          </span>
        </Tooltip>
        <Suspense fallback={<div>Preferences</div>}>
          <Preferences />
        </Suspense>
        <Tooltip title="Report Template Preferences">
          { !sm ? 
          <BiSolidReport fontSize={20} /> :
          <Button variant="outlined" color="cyan" className="header-preference-btn">
            Report Preferences
          </Button>
}
        </Tooltip>
        <UserProfile />
      </Space>
      <SettingsPanel
        visible={isSettingsPanelVisible}
        onClose={hideSettingsPanel}
      />
    </div>
  );
};

export default HeaderRight;
