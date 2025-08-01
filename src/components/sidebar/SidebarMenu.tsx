import { FC, useState } from "react";
import SidebarContent from "./SidebarContent";
interface SidebarMenuProps {
  collapsed: boolean;
}

const SidebarMenu: FC<SidebarMenuProps> = ({ collapsed }) => {
  const [selectedItems, setSelectedItems] = useState<any>();
  return (
      <SidebarContent
        collapsed={collapsed}
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
      />
  );
};

export default SidebarMenu;
