import { FC, useState } from "react";
import SidebarContent, { MenuItem } from "./SidebarContent";

interface SidebarMenuProps {
  collapsed: boolean;
}

const SidebarMenu: FC<SidebarMenuProps> = ({ collapsed }) => {
  const [selectedItems, setSelectedItems] = useState<MenuItem | undefined>();

  return (
    <SidebarContent
      collapsed={collapsed}
      selectedItems={selectedItems}
      setSelectedItems={setSelectedItems}
    />
  );
};

export default SidebarMenu;
