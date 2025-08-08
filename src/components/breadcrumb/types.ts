export interface MenuItem {
  key: string;
  label: React.ReactNode;
}
export interface Breadcrumb {
  title: React.ReactNode;
  key: string;
  menu?: { items: MenuItem[] };
  onClick?: () => void | Promise<void>; 
}

export interface BreadcrumbViewProps {
  breadcrumbs: Breadcrumb[];
  title: string;
}
