import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  Flex,
  Drawer,
  Input,
  Typography,
  Button,
  Grid,
  Badge,
} from "antd";
import {
  AudioOutlined,
  MenuOutlined,
  UserOutlined,
  LoginOutlined,
  CarryOutOutlined,
  ShoppingCartOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import "./Navbar.css";
import { LogoName } from "../../constant";
import { adminMenuItemsLeft, menuItemsLeft } from "./constant";
import {
  IconLogin,
  IconLogout,
  IconUser,
  IconUsers,
} from "@tabler/icons-react";
import CartDrawer from "../drawer/cart-drawer/CartDrawer";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../state/reducers/userSlice";
import { logoutAdmin } from "../../state/reducers/adminSlice";

const { Search } = Input;
const { Title } = Typography;
const { useBreakpoint } = Grid;

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: "#1677ff",
    }}
  />
);

const MenuItemsRight = (logged, cart) => {
  const items = [
    {
      key: logged ? "account" : "login",
      icon: logged ? <UserOutlined /> : <LoginOutlined />,
      label: logged ? "Account" : "Login",
      children: logged && [
        {
          type: "group",
          label: "Profile Settings",
          children: [
            {
              label: "Profile",
              key: "profile",
              icon: <UserOutlined />,
            },
            {
              label: "Orders",
              key: "orders",
              icon: <CarryOutOutlined />,
            },
            {
              label: "Cart",
              key: "cart",
              icon: <ShoppingCartOutlined />,
            },
            {
              label: "Admin",
              key: "admin",
              icon: <IconUsers />,
            },
          ],
        },
        {
          type: "group",
          label: "Logout",
          children: [
            // {
            //   label: "Option 3",
            //   key: "setting:3",
            // },
            {
              label: "Logout",
              key: "logout",
              icon: <LogoutOutlined />,
            },
          ],
        },
      ],
    },
    {
      key: "menu-cart",
      label: "Cart",
      icon: <ShoppingCartOutlined />,
    },
  ];
  return items;
};

const AdminMenuItemsRight = (isAdminAuthenticated) => {
  const items = [
    {
      key: isAdminAuthenticated ? "logout" : "login",
      label: isAdminAuthenticated ? "Logout" : "Login",
      icon: isAdminAuthenticated ? <IconLogout /> : <IconLogin />,
    },
  ];
  return items;
};

const ShowMenu = ({ handleCartDrawer }) => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const cart = useSelector((state) => state.cart.cart);
  const navigate = useNavigate();
  const location = useLocation();
  const screens = useBreakpoint();
  const [current, setCurrent] = useState("home");
  const [openMenu, setOpenMenu] = useState(false);
  const [logged, setLogged] = useState(false);
  const isAdminAuthenticated = useSelector(
    (state) => state.admin.isAdminAuthenticated
  );
  const onClick = (e) => {
    if (e.key === "logo" || e.key === "home" || e.key === "user") {
      setCurrent("home");
      navigate("/");
    } else if (e.key === "logout") {
      // setCurrent("logout");
      if (!location.pathname.includes("/admin")) {
        localStorage.removeItem("token");
        dispatch(logoutUser());
        navigate("/login");
      } else {
        if (isAdminAuthenticated) {
          localStorage.removeItem("admin-token");
          dispatch(logoutAdmin());
          navigate("/admin/login");
        } else {
          navigate("/admin/login");
        }
      }
    } else if (e.key === "menu-cart") {
      handleCartDrawer();
    } else {
      setCurrent(e.key);
      navigate(e.key);
    }
  };

  const handleOpenMenu = () => {
    setOpenMenu(!openMenu);
  };
  useEffect(() => {
    if (screens.md || screens.lg) {
      setOpenMenu(false);
    }
  }, [screens]);

  useEffect(() => {
    if (token) {
      setLogged(true);
    } else {
      setLogged(false);
    }
  }, [token]);

  useEffect(() => {
    if (location.pathname === "/") {
      setCurrent("home");
    } else if (location.pathname === "/admin/products") {
      setCurrent("/admin/products");
    } else {
      setCurrent(location.pathname.split("/")[1]);
    }
  }, [location]);
  return (
    <>
      <CartDrawer />
      <Flex justify="space-between" align="center" id="navbar">
        <Flex align="center" className="navbar-left-container" flex={1}>
          <Title level={4} onClick={onClick} className="navbar-logo">
            {LogoName}
          </Title>
          <Menu
            onClick={onClick}
            defaultSelectedKeys={[current]}
            selectedKeys={[current]}
            mode="horizontal"
            items={
              location.pathname.includes("/admin")
                ? [...adminMenuItemsLeft]
                : [...menuItemsLeft]
            }
            className="navbar-left"
          />
        </Flex>
        <Flex align="center" className="navbar-right-container">
          <Search
            placeholder="search for products..."
            enterButton="Search"
            size="large"
            suffix={suffix}
            className="navbar-search"
          />
          <Menu
            onClick={onClick}
            defaultSelectedKeys={[current]}
            selectedKeys={[current]}
            mode="horizontal"
            items={
              location.pathname.includes("/admin")
                ? [...AdminMenuItemsRight(isAdminAuthenticated)]
                : [...MenuItemsRight(logged)]
            }
            className="navbar-right"
          />
        </Flex>
        <Flex align="center" id="drawer-container">
          <Button icon={<MenuOutlined />} onClick={handleOpenMenu} />
          <Drawer open={openMenu} onClose={handleOpenMenu} title="Quick Links">
            <Search
              placeholder="search for products..."
              enterButton="Search"
              size="large"
              suffix={suffix}
              className="navbar-search-menu"
            />
            <Menu
              onClick={onClick}
              defaultSelectedKeys={[current]}
              selectedKeys={[current]}
              mode="inline"
              items={
                location.pathname.includes("/admin")
                  ? [
                      ...menuItemsLeft,
                      ...AdminMenuItemsRight(isAdminAuthenticated),
                    ]
                  : [...menuItemsLeft, ...MenuItemsRight(logged, cart)]
              }
              className="navbar-left"
            />
          </Drawer>
        </Flex>
      </Flex>
    </>
  );
};

const Navbar = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const handleCartDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  return (
    <>
      <ShowMenu handleCartDrawer={handleCartDrawer} />
      <CartDrawer onClose={handleCartDrawer} openDrawer={openDrawer} />
    </>
  );
};

export default Navbar;
