import { FC, useCallback, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import menuItems from '../menu-items';
import Navigation from "./Navigation";
import SimpleBarScroll from "./SimpleBarScroll";
import './sideNav/SideNav.css';

interface MenuItem {
  id: string;
  url?: string;
  title: string;
  icon?: string | { props: { className: string } };
  type?: string;
  children?: MenuItem[];
}

interface DrawerContentProps {
  selectedItems?: MenuItem;
  setSelectedItems: (item: MenuItem | undefined) => void;
  collapsed: boolean;
}

const DrawerContent: FC<DrawerContentProps> = ({ collapsed, selectedItems, setSelectedItems }) => {
  const [selectTab, setSelectTab] = useState<MenuItem>(menuItems.items[0]);
  const { pathname } = useLocation();

  const [open, setOpen] = useState<{ [key: string]: boolean }>({});

  const handleClick = (item: MenuItem) => {
    if (!item.id) return;
    const isMobile = window.innerWidth <= 1024;
    setOpen((prev) => ({
      ...prev,
      [item.id]: !prev[item.id],
    }));
    if (isMobile || !collapsed) {
      setSelectedItems(item);
    }
  };

  const isActive = useCallback(
    (item: MenuItem) => {
      if (!item.url) return false;
      return pathname.toLowerCase().includes(item.url.toLowerCase());
    },
    [pathname]
  );

  const autoOpenParents = useCallback(
    (items: MenuItem[] | undefined) => {
      const openMap: { [key: string]: boolean } = {};
      const findAndMark = (entries: MenuItem[] = []) => {
        entries.forEach((item) => {
          if (item.children) {
            const match = item.children.find((child) => isActive(child) || child.children?.some(isActive));
            if (match) openMap[item.id] = true;
            findAndMark(item.children);
          }
        });
      };
      findAndMark(items);
      setOpen(openMap);
    },
    [isActive]
  );

  useEffect(() => {
    autoOpenParents(selectTab?.children);
  }, [autoOpenParents, selectTab]);

  return (
    <>
      <SimpleBarScroll style={{ height: 'calc(100vh - 74px)' }}>
        <Navigation collapsed={collapsed} selectedItems={selectedItems} setSelectedItems={setSelectedItems} setSelectTab={setSelectTab} />
      </SimpleBarScroll>
      <div className="tab-link">
        <div className="navbar-content pc-trigger">
          <SimpleBarScroll style={{ height: 'calc(100vh - 74px)' }}>
            <ul className="pc-navbar">
              {selectTab?.children?.map((item) => (
                <li
                  key={item.id}
                  className={`pc-item pc-hasmenu ${open[item.id] ? 'pc-trigger' : ''} ${isActive(item) ? 'active' : ''}`}
                >
                  <Link to={item.url || '#'} className="pc-link" onClick={() => handleClick(item)}>
                    {item.icon && (
                      <span className="pc-micon">
                        <i className={typeof item.icon === 'string' ? item.icon : item.icon?.props.className} />
                      </span>
                    )}
                    <span className="pc-mtext">{item.title}</span>
                    {item.type === 'collapse' && (
                      <span className="pc-arrow">
                        <i className="ti ti-chevron-right" />
                      </span>
                    )}
                  </Link>
                  {open[item.id] && item.children && (
                    <ul className="pc-submenu">
                      {item.children.map((child) => (
                        <li
                          key={child.id}
                          className={`pc-item ${open[child.id] ? 'pc-trigger' : ''} ${isActive(child) ? 'active' : ''}`}
                        >
                          <Link to={child.url || '#'} className="pc-link" onClick={() => handleClick(child)}>
                            {child.icon && (
                              <span className="pc-micon">
                                <i className={typeof child.icon === 'string' ? child.icon : child.icon?.props.className} />
                              </span>
                            )}
                            {child.title}
                            {child.type === 'collapse' && (
                              <span className="pc-arrow">
                                <i className="ti ti-chevron-right" />
                              </span>
                            )}
                          </Link>
                          {open[child.id] && child.children && (
                            <ul className="pc-submenu">
                              {child.children.map((value) => (
                                <li key={value.id} className={`pc-item ${isActive(value) ? 'active' : ''}`}>
                                  <Link className="pc-link" to={value.url || ''}>
                                    {value.icon && (
                                      <span className="pc-micon">
                                        <i className={typeof value.icon === 'string' ? value.icon : value.icon?.props.className} />
                                      </span>
                                    )}
                                    {value.title}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </SimpleBarScroll>
        </div>
      </div>
    </>
  );
};

export default DrawerContent;