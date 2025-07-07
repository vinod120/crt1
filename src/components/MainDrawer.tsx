import { FC, useState } from "react";
import DrawerContent from "./DrawerContent";
interface MainDrawerProps {
  collapsed: boolean;
}

const MainDrawer: FC<MainDrawerProps> = ({ collapsed }) => {
  const [selectedItems, setSelectedItems] = useState<any>();
  return (
    <div className="crt-sidebar-content">
      <DrawerContent
        collapsed={collapsed}
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
      />
    </div>
  );
};

export default MainDrawer;
