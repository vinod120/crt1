import { FC, useState } from 'react';
import menuItems from '../menu-items';
import NavGroup from "./NavGroup";
import NavItem from "./NavItem";


interface MenuItem {
  id: string;
  type: string;
  title: string;
  children?: MenuItem[];
  icon?: string | { props: { className: string } };
  url?: string;
}

interface NavigationProps {
  selectedItems?: MenuItem;
  setSelectedItems: (item: MenuItem | undefined) => void;
  setSelectTab: (item: MenuItem) => void;
  collapsed: boolean;
}

const Navigation: FC<NavigationProps> = ({ collapsed, selectedItems, setSelectedItems, setSelectTab }) => {
  const [selectedID, setSelectedID] = useState<string>('');
  const [selectedLevel, setSelectedLevel] = useState<number>(0);

  const lastItem = null;
  let lastItemIndex = menuItems.items.length - 1;
  let remItems: MenuItem[] = [];
  let lastItemId: string | undefined;

  if (lastItem && lastItem < menuItems.items.length) {
    lastItemId = menuItems.items[lastItem - 1].id;
    lastItemIndex = lastItem - 1;
    remItems = menuItems.items.slice(lastItem - 1, menuItems.items.length).map((item) => ({
      id: item.id,
      type: item.type,
      title: item.title,
      elements: item.children,
      icon: item.icon,
      ...(item.url && { url: item.url }),
    }));
  }

  const navGroups = menuItems.items.slice(0, lastItemIndex + 1).map((item: MenuItem, index: number) => {
    switch (item.type) {
      case 'group':
        if (item.url && item.id !== lastItemId) {
          return (
            <li key={index} className="nav-item">
              <NavItem item={item} level={1} isParents collapsed={collapsed} />
            </li>
          );
        }
        return (
          <NavGroup
            key={item.id}
            setSelectedID={setSelectedID}
            setSelectedItems={setSelectedItems}
            setSelectedLevel={setSelectedLevel}
            selectedLevel={selectedLevel}
            selectedID={selectedID}
            selectedItems={selectedItems}
            lastItem={lastItem}
            remItems={remItems}
            lastItemId={lastItemId}
            item={item}
            setSelectTab={setSelectTab}
            collapsed={collapsed}
          />
        );
      default:
        return (
          <h6 key={item.id} className="text-danger align-items-center">
            Fix - Navigation Group
          </h6>
        );
    }
  });

  return <ul className="pc-navbar d-block">{navGroups}</ul>;
};

export default Navigation;