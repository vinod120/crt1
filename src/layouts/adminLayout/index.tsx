import AdminFooter from "@/components/footer";
import AdminHeader from "@/components/header";
import SideNav from "@/components/sideNav/indes";
import Dashboard from "@/pages/dashboard";
import { AppDispatch, RootState } from '@/store';
import { close } from '@/store/slices/sidebarSlice';
import { Drawer, Layout, Progress } from 'antd';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const { Content, Footer } = Layout;

const AdminLayout = () => {
  const { lg } = useBreakpoint();
  const isOpen = useSelector((state: RootState) => state.sidebar.isOpen);
  const themeType = useSelector((state: RootState) => state.theme.theme);
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout style={{ minHeight: '100vh', display: 'flex', flexDirection: 'row' }}>
      {lg ? (
        <SideNav collapsed={!isOpen} />
      ) : (
        <Drawer
          title={null}
          placement="left"
          onClose={() => dispatch(close())}
          open={isOpen}
          bodyStyle={{ padding: 0 }}
          width={250}

        >
          <SideNav collapsed={false} />
        </Drawer>
      )}
      <Layout style={{ flex: 1, display: 'flex', flexDirection: 'column',  margin: isOpen ? "0 auto 0 250px" : 'unset' }}>
        {isLoading && (
          <div style={{ position: 'fixed', top: 10, right: 10, zIndex: 1000 }}>
            <Progress percent={75} size="small" />
          </div>
        )}
       <AdminHeader />
        <Content style={{ flex: 1, overflow: 'auto', margin: '24px 16px 0' }}>
          <div style={{ padding: 24, background: themeType === 'light' ? '#f4f7fa' : '#212224', minHeight: 'calc(100vh - 64px - 70px)' }}>
            <Dashboard />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center', background: themeType === 'light' ? '#f4f7fa' : '#212224', color: themeType === 'light' ? '#000' : '#fff' }}>
         <AdminFooter />
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;