import FooterNav from "@/components/footer";
import Header from "@/components/header";
import NProgressLoader from "@/components/loader/NProgressLoader";
import SideNav from "@/components/sidebar";
import { AppDispatch, RootState } from "@/store";
import { close } from "@/store/slices/sidebarSlice";
import { Drawer, FloatButton, Layout } from "antd";
import useBreakpoint from "antd/es/grid/hooks/useBreakpoint";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import "./Layout.css";

const { Content, Footer } = Layout;

const AppLayout = () => {
  const { lg, md } = useBreakpoint();
  const isOpen = useSelector((state: RootState) => state.sidebar.isOpen);
  const dispatch = useDispatch<AppDispatch>();
  const floatBtnRef = useRef(null);
  return (
    <>
      <NProgressLoader />
      <Layout
        style={{ minHeight: "100vh", display: "flex", flexDirection: "row" }}
      >
        {lg || md ? (
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
        <Layout
          className="app-layout"
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            margin: isOpen ? "0 auto 0 250px" : "unset",
          }}
        >
          <Header />
          <Content
            style={{ flex: 1, overflow: "auto" }}
            className="app-layout-content"
          >
            <Outlet />
            <div ref={floatBtnRef}>
              <FloatButton.BackTop type="primary" />
            </div>
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
