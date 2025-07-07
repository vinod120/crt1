import { AppDispatch, RootState } from '@/store';
import { toggle } from '@/store/slices/sidebarSlice';
import { toggleTheme } from '@/store/slices/themeSlice';
import { BellOutlined, MenuOutlined, MoonOutlined, SettingOutlined, SunOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Button } from 'antd';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import './AdminHeader.css';

const AdminHeader = () => {
  const themeType = useSelector((state: RootState) => state.theme.theme);
  const dispatch = useDispatch<AppDispatch>();
  const [navFill, setIsNavFill] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsNavFill(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`crt-header ${navFill ? 'crt-header--filled' : ''}`}>
      <div className="crt-header-content">
        <div className="crt-header-left">
          <Button
            type="text"
            icon={<MenuOutlined />}
            onClick={() => dispatch(toggle())}
            className="crt-header-button"
          />
          <Breadcrumb>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="crt-header-right">
          <Button
            type="text"
            icon={<SettingOutlined />}
            className="crt-header-button"
          />
          <Button
            type="text"
            icon={<BellOutlined />}
            className="crt-header-button"
          >
            <span className="crt-notification-badge">3</span>
          </Button>
          <Button
            type="text"
            icon={<UserOutlined />}
            className="crt-header-button"
          />
          <Button
            type="text"
            icon={themeType === 'light' ? <SunOutlined /> : <MoonOutlined />}
            onClick={() => dispatch(toggleTheme())}
            className="crt-header-button"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;