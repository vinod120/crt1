import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { matchPath, useLocation, useNavigate } from 'react-router-dom';
import NavItem from "./NavItem";

interface MenuItem {
  id: string;
  url?: string;
  title: string;
  icon?: string | { props: { className: string } };
  type?: string;
  children?: MenuItem[];
  badge?: string;
  link?: string;
}

interface NavCollapseProps {
  menu: MenuItem;
  level: number;
  parentId: string;
  setSelectedItems: (item: MenuItem | undefined) => void;
  selectedItems?: MenuItem;
  setSelectedLevel: (level: number) => void;
  selectedLevel: number;
  collapsed: boolean;
}

const NavCollapse: FC<NavCollapseProps> = ({
  menu,
  level,
  parentId,
  setSelectedItems,
  selectedItems,
  setSelectedLevel,
  selectedLevel,
  collapsed
}) => {
  const navigation = useNavigate();

  const [open, setOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<string | null>(null);
  const { pathname } = useLocation();

  const isMenuActive = (menu: MenuItem, currentPath: string): boolean => {
    if (menu.type === 'item') {
      return menu.url === currentPath;
    }
    if (menu.type === 'collapse' && Array.isArray(menu.children)) {
      return menu.children.some((child) => isMenuActive(child, currentPath));
    }
    return false;
  };

  const handleClick = (isRedirect: boolean) => {
    const isMobile = window.innerWidth <= 1024;
    setSelectedLevel(level);
    if (isMobile || !collapsed) {
      setOpen(!open);
      setSelected(!selected ? menu.id : null);
      setSelectedItems(!selected ? menu : selectedItems);
      if (menu.url && isRedirect) navigation(`${menu.url}`);
    }
  };

  useMemo(() => {
    if (selected === selectedItems?.id) {
      if (level === 1) {
        setOpen(true);
      }
    } else {
      if (level === selectedLevel) {
        setOpen(false);
        if (collapsed) {
          setSelected(null);
        }
      }
    }
  }, [selectedItems, level, selected, collapsed, selectedLevel]);

  useEffect(() => {
    if (pathname === menu.url) {
      setSelected(menu.id);
    }
  }, [pathname, menu.id, menu.url]);

  const checkOpenForParent = useCallback(
    (child: MenuItem[], id: string) => {
      child.forEach((item) => {
        if (item.url === pathname) {
          setOpen(true);
          setSelected(id);
        }
      });
    },
    [pathname]
  );

  useEffect(() => {
    setOpen(false);
    if (menu.children) {
      menu.children.forEach((item) => {
        if (item.children?.length) {
          checkOpenForParent(item.children, menu.id);
        }
        if (item.link && !!matchPath({ path: item?.link, end: false }, pathname)) {
          setSelected(menu.id);
          setOpen(true);
        }
        if (item.url === pathname) {
          setSelected(menu.id);
          setOpen(true);
        }
      });
    }
  }, [pathname, menu.id, menu.children, checkOpenForParent]);

  useEffect(() => {
    if (menu.url === pathname) {
      setSelected(menu.id);
      setOpen(true);
    }
  }, [pathname, menu]);

  const navCollapse = menu.children?.map((item: MenuItem) => {
    switch (item.type) {
      case 'collapse':
        return (
          <NavCollapse
            key={item.id}
            setSelectedItems={setSelectedItems}
            setSelectedLevel={setSelectedLevel}
            selectedLevel={selectedLevel}
            selectedItems={selectedItems}
            menu={item}
            level={level + 1}
            parentId={parentId}
          />
        );
      case 'item':
        return <NavItem key={item.id} item={item} level={level + 1} />;
      default:
        return (
          <h6 key={item.id} className="text-danger align-center">
            Fix - Collapse or Item
          </h6>
        );
    }
  });

  return (
    <li className={`pc-item pc-hasmenu ${open && 'pc-trigger'}`}>
      <a className="pc-link" href="#!" onClick={() => handleClick(true)}>
        {menu.icon && (
          <span className="pc-micon">
            <i className={typeof menu.icon === 'string' ? menu.icon : menu.icon?.props.className} />
          </span>
        )}
        <span className="pc-mtext">{menu.title}</span>
        <span className="pc-arrow">
          <i className="ti ti-chevron-right" />
        </span>
        {menu.badge && <span className="pc-badge">{menu.badge}</span>}
      </a>
      {open && <ul className="pc-submenu">{navCollapse}</ul>}
    </li>
  );
};

export default NavCollapse;