import { FC } from 'react';
import { Link, matchPath, useLocation } from 'react-router-dom';
export interface Asset {
  assetId: number;
  assetName: string;
  assetTypeName: string;
  location: string;
  manufacturer: string;
}

export interface MenuItem {
  id: string;
  title: string;
  type?: 'group' | 'collapse' | 'item';
  url?: string;
  link?: string;
  icon?: string | { props: { className: string } };
  children?: MenuItem[];
  badge?: string;
  target?: boolean;
  deptId?: string; // For departments
  asset?: Asset; // For assets
}
interface NavItemProps {
  item: MenuItem;
  level?: number;
  isParents?: boolean;
  collapsed: boolean;
}

const NavItem: FC<NavItemProps> = ({ item, collapsed }) => {
  const { pathname } = useLocation();
  const itemPath = item?.link || item?.url;

  let itemTarget = '_self';
  if (item.target) {
    itemTarget = '_blank';
  }
  const isSelected = itemPath ? !!matchPath({ path: itemPath, end: true }, pathname) : false;

  return (
    <li className={`pc-item ${isSelected ? 'active' : ''}`}>
      <Link className="pc-link" to={item?.url || '#'} target={itemTarget}>
        {item?.icon && (
          <span className="pc-micon">
            <i className={typeof item.icon === 'string' ? item.icon : item.icon?.props.className} />
          </span>
        )}
        <span className="pc-mtext">{item.title}</span>
      </Link>
    </li>
  );
};

export default NavItem;