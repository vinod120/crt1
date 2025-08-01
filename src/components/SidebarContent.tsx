import { DownOutlined, HomeOutlined, RightOutlined } from "@ant-design/icons";
import { FC, useCallback, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import menuItems from "../menu-items";
import SimpleBarScroll from "../scrollbar/SimpleBarScroll";

interface MenuItem {
  id: string;
  url?: string;
  title: string;
  icon?: string | { props: { className: string } };
  type?: string;
  children?: MenuItem[];
}

interface SidebarContentProps {
  selectedItems?: MenuItem;
  setSelectedItems: (item: MenuItem | undefined) => void;
  collapsed: boolean;
}

const SidebarContent: FC<SidebarContentProps> = ({
  collapsed,
  selectedItems,
  setSelectedItems,
}) => {
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
            const match = item.children.find(
              (child) => isActive(child) || child.children?.some(isActive)
            );
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
    <div className="crt-sidebar-content">
      <div className="tab-link">
        <div className="pc-trigger">
          <SimpleBarScroll style={{ height: "calc(100vh - 74px)" }}>
            <ul className="pc-navbar">
              {selectTab?.children?.map((item) => (
                <li
                  key={item.id}
                  className={`pc-item pc-hasmenu ${
                    open[item.id] ? "pc-trigger" : item.id
                  } ${isActive(item) ? "active" : ""}`}
                >
                  <Link
                    to={item.url || "#"}
                    className="pc-link"
                    onClick={() => handleClick(item)}
                  >
                    <span className="pc-micon">
                      <HomeOutlined
                        style={{ fontSize: "15px", fontWeight: "bolder" }}
                      />
                    </span>
                    <span className="pc-mtext">{item.title}</span>
                    <span className="pc-arrow">
                      {" "}
                      {open[item.id] ? (
                        <DownOutlined
                          style={{ fontSize: "12px", fontWeight: "bolder" }}
                        />
                      ) : (
                        <RightOutlined
                          style={{ fontSize: "12px", fontWeight: "bolder" }}
                        />
                      )}
                    </span>
                  </Link>
                  {open[item.id] && item.children && (
                    <ul className="pc-submenu">
                      {item.children.map((child) => (
                        <li
                          key={child.id}
                          className={`pc-item ${
                            open[child.id] ? "pc-trigger" : ""
                          } ${isActive(child) ? "active" : ""}`}
                        >
                          <Link
                            to={child.url || "#"}
                            className="pc-link"
                            onClick={() => handleClick(child)}
                          >
                            {child.title}
                          </Link>
                          {open[child.id] && child.children && (
                            <ul className="pc-submenu">
                              {child.children.map((value) => (
                                <li
                                  key={value.id}
                                  className={`pc-item ${
                                    isActive(value) ? "active" : ""
                                  }`}
                                >
                                  <Link
                                    className="pc-link"
                                    to={value.url || ""}
                                  >
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
    </div>
  );
};

export default SidebarContent;
