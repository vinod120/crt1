import FooterNav from "@/components/footer";
import Header from "@/components/header";
import NProgressLoader from "@/components/loader/NProgressLoader";
import SideNav from "@/components/sidebar";
import Dashboard from "@/pages/dashboard";
import { AppDispatch, RootState } from '@/store';
import { close } from '@/store/slices/sidebarSlice';
import { Drawer, Layout } from 'antd';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./Layout.css";

const { Content, Footer } = Layout;

const AppLayout = () => {
  const { lg, md } = useBreakpoint();
  const isOpen = useSelector((state: RootState) => state.sidebar.isOpen);
  const themeType = useSelector((state: RootState) => state.theme.theme);
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
    <NProgressLoader />
    <Layout style={{ minHeight: '100vh', display: 'flex', flexDirection: 'row' }}>
      {(lg || md)? (
        <SideNav collapsed={!isOpen} />
      ) : (
        <Drawer
          title={null}
          placement="left"
          onClose={() => dispatch(close())}
          open={isOpen}
          width={200}
          styles={{ body: { padding: 0 } }}
        >
          <SideNav collapsed={false} />
        </Drawer>
      )}
      <Layout className="app-layout" style={{ flex: 1, display: 'flex', flexDirection: 'column',  margin: isOpen ? "0 auto 0 250px" : 'unset' }}>
       <Header />
        <Content style={{ flex: 1, overflow: 'auto'}} className="app-layout-content">
            <Dashboard />
        </Content>
        <Footer className="crt-footer">
         <FooterNav />
        </Footer>
      </Layout>
    </Layout>
    </>
  );
};

export default AppLayout;