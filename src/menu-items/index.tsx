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

export const transformMenuData = (data: any[]): MenuItem[] => {
  return data.map((dept) => ({
    id: dept.deptId,
    title: dept.deptName,
    type: 'collapse',
    children: dept.childrens.map((asset: any) => ({
      id: asset.assetId.toString(),
      title: asset.assetName,
      type: 'item',
      url: `/asset/${asset.assetId}`,
      asset: {
        assetId: asset.assetId,
        assetName: asset.assetName,
        assetTypeName: asset.assetTypeName,
        location: asset.location,
        manufacturer: asset.manufacturer,
      },
    })),
  }));
};
const data = [
  {
    deptName: "System Department",
    deptId: "2803900606",
    childrens: [
      {
        assetId: 1747916936,
        assetName: "Asset 1",
        assetTypeName: "HeatBath",
        location: "HYD",
        manufacturer: "KAye",
      },
      {
        assetId: 1747916932,
        assetName: "Asset 2",
        assetTypeName: "HeatBath1",
        location: "HYD",
        manufacturer: "KAye",
      },
    ],
  },
  {
    deptName: "System 2",
    deptId: "2803900607",
    childrens: [
      {
        assetId: 1747916931,
        assetName: "Asset 13",
        assetTypeName: "HeatBath4",
        location: "HYD",
        manufacturer: "KAye",
      },
      {
        assetId: 1747916913,
        assetName: "Asset 5",
        assetTypeName: "HeatBath5",
        location: "HYD",
        manufacturer: "KAye",
      },
    ],
  },
];

const menuItems: { items: MenuItem[] } = {
  items: [
    {
      id: 'navigation',
      title: 'Navigation',
      type: 'group',
      children: transformMenuData(data),
    },
  ],
};

export default menuItems;