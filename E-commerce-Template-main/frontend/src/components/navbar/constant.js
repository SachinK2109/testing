import {
  HomeOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  ShopOutlined,
  CarryOutOutlined,
  LoginOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

export const menuItemsLeft = [
  {
    key: "home",
    label: "Home",
    icon: <HomeOutlined />,
  },
  {
    key: "shop",
    label: "Shop",
    icon: <ShopOutlined />,
  },
  {
    key: "about",
    label: "About",
    icon: <ShopOutlined />,
  },
  {
    key: "contact",
    label: "Contact",
    icon: <ShopOutlined />,
  },
];

export const adminMenuItemsLeft = [
  // {
  //   key: "dashboard",
  //   label: "Dashboard",
  //   icon: <HomeOutlined />,
  // },
  {
    key: "/admin",
    label: "Products",
    icon: <ShopOutlined />,
  },
  {
    key: "/admin/orders",
    label: "Orders",
    icon: <ShopOutlined />,
  },
  // {
  //   key: "/admin/users",
  //   label: "Users",
  //   icon: <ShopOutlined />,
  // },
];
