import { AppDispatch, RootState } from '@/store';
import { toggle } from '@/store/slices/sidebarSlice';
import { toggleTheme } from '@/store/slices/themeSlice';
import { BellOutlined, MenuOutlined, MoonOutlined, SettingOutlined, SunOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Button } from 'antd';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';

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
    <div
      // style={{
      //   position: 'sticky',
      //   top: 0,
      //   background: themeType === 'light' ? '#f4f7fab3' : '#212224b3',
      //   padding: '0 16px',
      //   backdropFilter: navFill ? 'blur(7px)' : 'none',
      //   zIndex: navFill ? 9999 : 'none'
      // }}
      style={{
  position: 'sticky',
  top: 0,
  background: themeType === 'light' ? 'rgba(244, 247, 250, 0.95)' : '#212224b3',
  padding: '0 16px',
  backdropFilter: navFill ? 'blur(7px)' : 'none',
  boxShadow: navFill ? '0 2px 6px rgba(0, 0, 0, 0.05)' : 'none',
  zIndex: 999
}}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 64 }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Button
            type="text"
            icon={<MenuOutlined />}
            onClick={() => dispatch(toggle())}
            style={{ marginRight: 16, color: themeType === 'light' ? '#000' : '#fff' }}
          />
          <Breadcrumb>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div>
          <Button type="text" icon={<SettingOutlined />} style={{ color: themeType === 'light' ? '#000' : '#fff' }} />
          <Button
            type="text"
            icon={<BellOutlined />}
            style={{ color: themeType === 'light' ? '#000' : '#fff' }}
          >
            <span style={{ position: 'relative', top: -10, right: -5, background: '#52c41a', borderRadius: '50%', padding: '2px 6px', color: '#fff', fontSize: 12 }}>3</span>
          </Button>
          <Button type="text" icon={<UserOutlined />} style={{ color: themeType === 'light' ? '#000' : '#fff' }} />
          <Button
            type="text"
            icon={themeType === 'light' ? <SunOutlined /> : <MoonOutlined />}
            onClick={() => dispatch(toggleTheme())}
            style={{ color: themeType === 'light' ? '#000' : '#fff' }}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;