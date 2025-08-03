export interface SideNavProps {
  collapsed: boolean;
  searchText: string;
}
export interface Asset {
  assetId: string;
  assetName: string;
  assetTypeName: string;
  location: string;
  manufacturer: string;
  description: string;
}

export interface Department {
  deptId: any;
  departmentId: string;
  deptName: string;
  assetInfo?: Asset[];
}

export interface MenuItem {
  id: string;
  title: string;
  type?: "group" | "collapse" | "item";
  url?: string;
  icon?: string | { props: { className: string } };
  children?: MenuItem[];
  deptId?: string;
  asset?: Asset;
}
export interface SidebarHeaderProps {
  collapsed: boolean;
}
export interface SidebarMenuProps {
  searchText: string;
}