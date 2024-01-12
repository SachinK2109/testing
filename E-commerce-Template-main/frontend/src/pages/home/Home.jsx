import React, { useEffect } from "react";
import { Layout, theme } from "antd";
import { Outlet } from "react-router-dom";
import { Navbar, Footer as Footy } from "../../components";
import "./Home.css";
import { getOrder, getProfile } from "../../services/userDataService";
import { getCart } from "../../services/cartDataService";
import { useDispatch } from "react-redux";
import { setAuthentication, setUser } from "../../state/reducers/userSlice";
import { setCart } from "../../state/reducers/cartSlice";
import {
  getAllProducts,
  getFeaturedProducts,
  getNewProducts,
  getTodaysDealProducts,
} from "../../services/productDataService";
import {
  setFeaturedProducts,
  setNewProducts,
  setProducts,
  setTodaysDealProducts,
} from "../../state/reducers/productSlice";
import { setOrder } from "../../state/reducers/orderSlice";
import { setAdminAuthentication } from "../../state/reducers/adminSlice";

const { Header, Footer, Content } = Layout;

const Home = () => {
  const userToken = localStorage.getItem("token");
  const dispatch = useDispatch();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const getUser = async () => {
    const user = await getProfile();
    dispatch(setUser(user.data.data));
    const cart = await getCart();
    dispatch(setCart(cart.data.data.items));
    const order = await getOrder();
    // console.log(order);
    dispatch(setOrder(order.data.data));
  };

  const getProducts = async () => {
    const products = await getAllProducts();
    const newProducts = await getNewProducts();
    const featuredProducts = await getFeaturedProducts();
    const todaysDealProducts = await getTodaysDealProducts();
    // console.log(products.data.data);
    dispatch(setProducts(products.data.data));
    dispatch(setNewProducts(newProducts.data.data));
    dispatch(setFeaturedProducts(featuredProducts.data.data));
    dispatch(setTodaysDealProducts(todaysDealProducts.data.data));
  };

  useEffect(() => {
    if (userToken) {
      getUser();
    }
    getProducts();
  }, [dispatch]);

  useEffect(() => {
    dispatch(setAuthentication(userToken));
  }, [userToken]);
  return (
    <Layout>
      <Header id="header" style={{ padding: 0 }}>
        <Navbar />
      </Header>
      <Content id="main" style={{ background: colorBgContainer }}>
        <Outlet />
      </Content>
      <Footer id="footer">
        <Footy />
      </Footer>
    </Layout>
  );
};

export default Home;
