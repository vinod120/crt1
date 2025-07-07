import { FC, useEffect, useRef, useState } from 'react';
import DrawerContent from "./DrawerContent";
interface MainDrawerProps {
  collapsed: boolean;
}

const MainDrawer: FC<MainDrawerProps> = ({collapsed}) => {
  const [selectedItems, setSelectedItems] = useState<any>();
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 1024);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav id="pc-sidebar" className={`pc-sidebar ${!collapsed ? 'pc-sidebar-hide mob-sidebar-active' : ''}`}>
      <div className="navbar-wrapper">
        <div className="m-header">
          <a className="b-brand text-primary">
            <img src={""} className="logo logo-lg" alt="logo" style={{ width: '100%' }} />
          </a>
        </div>
        <div className="navbar-content">
          <DrawerContent collapsed={collapsed} selectedItems={selectedItems} setSelectedItems={setSelectedItems} />
        </div>
      </div>
      {/* {collapsed && isMobile && <div className="pc-menu-overlay" ref={overlayRef} />} */}
    </nav>
  );
};

export default MainDrawer;