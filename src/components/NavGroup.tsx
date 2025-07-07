import { FC, Fragment, useCallback, useEffect, useState } from 'react';
import { matchPath, useLocation } from 'react-router-dom';
import NavCollapse from './NavCollapse';
import NavItem from './NavItem';

interface MenuItem {
  id: string;
  type: string;
  title: string;
  children?: MenuItem[];
  icon?: string | { props: { className: string } };
  url?: string;
}

interface NavGroupProps {
  item: MenuItem;
  lastItem: number | null;
  remItems: MenuItem[];
  lastItemId?: string;
  setSelectedID: (id: string) => void;
  setSelectedItems: (item: MenuItem | undefined) => void;
  selectedItems?: MenuItem;
  setSelectedLevel: (level: number) => void;
  selectedLevel: number;
  setSelectTab: (item: MenuItem) => void;
  collapsed: boolean;
}

const NavGroup: FC<NavGroupProps> = ({
  item,
  lastItem,
  remItems,
  lastItemId,
  setSelectedID,
  setSelectedItems,
  selectedItems,
  setSelectedLevel,
  selectedLevel,
  setSelectTab,
  collapsed
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [currentItem, setCurrentItem] = useState<MenuItem>(item);
  const { pathname } = useLocation();

  const openMini = Boolean(anchorEl);

  useEffect(() => {
    if (lastItem) {
      if (item.id === lastItemId) {
        const localItem = { ...item };
        const elements = remItems.map((ele) => ele?.children).flat(1);
        localItem.children = elements;
        setCurrentItem(localItem);
      } else {
        setCurrentItem(item);
      }
    }
  }, [item, lastItem, lastItemId, remItems]);

  const checkOpenForParent = useCallback(
    (child: MenuItem[], id: string) => {
      child.forEach((ele) => {
        if (ele.children?.length) {
          checkOpenForParent(ele.children, currentItem.id);
        }
        if (ele.url && !!matchPath({ path: ele?.link ? ele.link : ele.url, end: true }, pathname)) {
          setSelectedID(id);
        }
      });
    },
    [currentItem.id, pathname, setSelectedID]
  );

  const checkSelectedOnload = useCallback(
    (data: MenuItem) => {
      const children = data.children ?? [];
      children.forEach((itemCheck) => {
        if (!itemCheck) return;
        if (itemCheck.children?.length) {
          checkOpenForParent(itemCheck.children, currentItem.id);
        }
        if (itemCheck.url && matchPath({ path: itemCheck.link ? itemCheck.link : itemCheck.url, end: true }, pathname)) {
          setSelectedID(currentItem.id);
        }
      });
    },
    [pathname, currentItem, checkOpenForParent, setSelectedID]
  );

  useEffect(() => {
    checkSelectedOnload(currentItem);
    if (openMini) setAnchorEl(null);
  }, [pathname, currentItem, checkSelectedOnload, openMini]);

  const navCollapse = item.children?.map((menuItem: MenuItem, index: number) => {
    const key = menuItem.id || `${menuItem.type}-${index}`;
    switch (menuItem.type) {
      case 'collapse':
        return (
          <NavCollapse
            key={key}
            menu={menuItem}
            setSelectedItems={setSelectedItems}
            setSelectedLevel={setSelectedLevel}
            selectedLevel={selectedLevel}
            selectedItems={selectedItems}
            level={1}
            parentId={currentItem.id}
            collapsed={collapsed}
          />
        );
      case 'item':
        return <NavItem key={key} item={menuItem} level={1} />;
      default:
        return (
          <h6 key={`fix-${index}`} className="text-danger align-center">
            Fix - Group Collapse or Items
          </h6>
        );
    }
  });

  return (
    <Fragment>
      <li className="pc-item pc-caption" key={item.id}>
        {/* <label>{item.title}</label> */}
      </li>
      {navCollapse}
    </Fragment>
  );
};

export default NavGroup;