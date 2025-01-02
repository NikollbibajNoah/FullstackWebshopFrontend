import { Button, Layout, Menu, theme } from "antd";
import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import {
  RouteConfiguration,
  RoutesConfigurations,
} from "../RouteConfiguration";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { MenuInfo } from "rc-menu/lib/interface";
import { ProductDetails } from "../components/ProductDetails";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { ShoppingCart } from "../components";

export default function MainLayout() {
  const [routes, setRoutes] = useState<RouteConfiguration[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setRoutes(RoutesConfigurations);
  }, []);

  const handleNavMenuClick = (e: MenuInfo) => {
    const key = Number(e.key);

    navigate(routes[key].path);
  };

  const handleShoppingCartNavigation = () => { 
    navigate("/shoppingcart");
   }

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="text-white text-2xl mr-5">WebShop</div>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["0"]}
          style={{
            flex: 1,
            minWidth: 0,
          }}
          onClick={(e: MenuInfo) => {
            handleNavMenuClick(e);
          }}
        >
          {RoutesConfigurations.map((c: RouteConfiguration, i: number) => (
            <Menu.Item key={i}>{c.title}</Menu.Item>
          ))}
        </Menu>
        <div>
          <Button type="primary" onClick={handleShoppingCartNavigation}>
            <span>Warenkorb</span>
            <ShoppingCartOutlined />
          </Button>
        </div>
      </Header>
      <Content className={"py-2 px-12"}>
        {/* <h1>{config[currentKey].title}</h1> */}
        <h1>asdad</h1>
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          <Routes>
            {routes.map((route: RouteConfiguration, i: number) => (
              <Route key={i} path={route.path} element={route.element} />
            ))}
            <Route path="products/:id" element={<ProductDetails />} />
            <Route path="shoppingcart" element={<ShoppingCart />} />
          </Routes>
        </div>
      </Content>
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
}
