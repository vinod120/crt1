import { FC } from 'react';
import { Link, matchPath, useLocation } from 'react-router-dom';

interface MenuItem {
  id: string;
  url?: string;
  link?: string;
  title: string;
  icon?: string | { props: { className: string } };
  target?: boolean;
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
      <Link
        className="pc-link"
        to={item?.url || '#'}
        target={itemTarget}
        // onClick={() => {
        //   handlerDrawerOpen(false);
        // }}
      >
        {item?.icon && (
          <span className="pc-micon">
            <i className={typeof item.icon === 'string' ? item.icon : item.icon?.props.className} />
          </span>
        )}
        {item.title}
      </Link>
    </li>
  );
};

export default NavItem;