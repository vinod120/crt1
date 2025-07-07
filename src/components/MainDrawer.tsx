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
        <div className="crt-sidebar-content">
          <DrawerContent collapsed={collapsed} selectedItems={selectedItems} setSelectedItems={setSelectedItems} />
        </div>
  );
};

export default MainDrawer;