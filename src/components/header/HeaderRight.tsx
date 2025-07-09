import { AppDispatch, RootState } from "@/store";
import { toggleTheme } from "@/store/slices/themeSlice";
import {
  ClockCircleOutlined,
  MoonOutlined,
  SettingOutlined,
  SunOutlined,
} from "@ant-design/icons";
import { Space } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserProfile from "../profile/UserProfile";

const HeaderRight: React.FC = () => {
  const themeType = useSelector((state: RootState) => state.theme.theme);
  const dispatch = useDispatch<AppDispatch>();

  const [time, setTime] = useState(() => new Date().toLocaleTimeString());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="crt-header-right">
      <Space size="middle" align="center">
        <div className="crt-time">
          <ClockCircleOutlined style={{ marginRight: 4 }} />
          <span>{time}</span>
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
