import { FC } from "react";
import SidebarContent from "./SidebarContent";
import { SidebarMenuProps } from "./types";

const SidebarMenu: FC<SidebarMenuProps> = ({searchText }) => {
  return (
    <SidebarContent
      searchText={searchText}
    />
  );
};

export default SidebarMenu;
