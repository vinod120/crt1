import SimpleBarScroll from "@/scrollbar/SimpleBarScroll";
import {
  useAssetsBasedOnPreferencesQuery,
  useSearchByAssetsOrStudyQuery,
} from "@/services/queries/assetQueries";
import { RootState } from "@/store";
import {
  DownOutlined,
  HomeOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { Skeleton } from "antd";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { Department, MenuItem } from "./types";

export const transformMenuData = (departments?: Department[]): MenuItem[] =>
  departments?.map((dept) => ({
    id: dept?.departmentId || "",
    title: dept?.deptName || "",
    type: "collapse",
    deptId: dept?.departmentId,
    children: Array.isArray(dept?.assetInfo)
      ? dept?.assetInfo?.map((asset) => ({
          id: asset?.assetId || "",
          title: asset?.assetName || "Unnamed Asset",
          type: "item",
          url: asset?.assetId ? `/asset/${asset?.assetId}` : "#",
          asset,
        }))
      : [],
  })) || [];

interface SidebarContentProps {
  searchText: string;
}

const SidebarContent: FC<SidebarContentProps> = ({ searchText }) => {
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const { pathname } = useLocation();
  const preferences = useSelector((state: RootState) => state?.preferences);

  const {
    data: departments = [],
    isLoading,
    isError,
  } = searchText?.trim()
    ? useSearchByAssetsOrStudyQuery({
        searchText: searchText.trim(),
        enabled: preferences?.loaded,
        preferences,
      })
    : useAssetsBasedOnPreferencesQuery({
        enabled: preferences?.loaded,
        preferences,
      });

  const menuData: MenuItem = useMemo(
    () => ({
      id: "navigation",
      title: "Navigation",
      type: "group",
      children: transformMenuData(departments),
    }),
    [departments]
  );

  const isActive = useCallback(
    (item: MenuItem) =>
      item?.url && pathname?.toLowerCase()?.includes(item?.url?.toLowerCase()),
    [pathname]
  );

  useEffect(() => {
    if (!departments?.length) return;

    const openMap: Record<string, boolean> = {};
    departments.forEach((dept: { assetInfo: any[]; departmentId: string | number; }) => {
      if (
        Array.isArray(dept.assetInfo) &&
        dept.assetInfo.some((asset) =>
          pathname?.toLowerCase()?.includes(asset.assetId?.toLowerCase())
        )
      ) {
        openMap[dept.departmentId] = true;
      }
    });

    setOpen(openMap);
  }, [departments, pathname]);

  const handleClick = (item: MenuItem) => {
    if (!item?.id || item?.type === "group") return;

    if (item?.type === "collapse") {
      setOpen((prev) => ({
        ...prev,
        [item?.id]: !prev[item?.id],
      }));
    }
  };

  if (isLoading) {
    return (
      <div className="crt-sidebar-content">
        {Array.from({ length: 10 }).map((_, index) => (
          <Skeleton.Input
            active
            key={index}
            style={{ width: "100%", marginTop: 8, marginBottom: 8 }}
          />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="crt-sidebar-content">
        <p style={{ padding: 16, color: "#999" }}>
          No departments or assets available.
        </p>
      </div>
    );
  }

  return (
    <div className="crt-sidebar-content">
      <div className="tab-link">
        <div className="pc-trigger">
          <SimpleBarScroll style={{ height: "calc(100vh - 114px)" }}>
            <ul className="pc-navbar">
              {menuData?.children?.map((item) => (
                <li
                  key={item?.id}
                  className={`pc-item pc-hasmenu ${
                    item?.type === "collapse" && open[item?.id] ? "pc-trigger" : ""
                  } ${isActive(item) ? "active" : ""}`}
                >
                  <Link
                    to={item?.url || "#"}
                    className="pc-link"
                    onClick={() => handleClick(item)}
                  >
                    <span className="pc-micon">
                      <HomeOutlined style={{ fontSize: 15, fontWeight: "bolder" }} />
                    </span>
                    <span className="pc-mtext">{item?.title}</span>
                    {item?.type === "collapse" && (
                      <span className="pc-arrow">
                        {open[item?.id] ? (
                          <DownOutlined style={{ fontSize: 12, fontWeight: "bolder" }} />
                        ) : (
                          <RightOutlined style={{ fontSize: 12, fontWeight: "bolder" }} />
                        )}
                      </span>
                    )}
                  </Link>

                  {item?.type === "collapse" &&
                    open[item?.id] &&
                    Array.isArray(item?.children) &&
                    item?.children?.length > 0 && (
                      <ul className="pc-submenu">
                        {item?.children?.map((child) => (
                          <li
                            key={child?.id}
                            className={`pc-item ${isActive(child) ? "active" : ""}`}
                          >
                            <Link
                              to={child?.url || "#"}
                              className="pc-link"
                              onClick={() => handleClick(child)}
                            >
                              {child?.title}
                            </Link>
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
