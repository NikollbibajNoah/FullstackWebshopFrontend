import {
  Button,
  Layout,
  Menu,
  theme,
  CollapseProps,
  Collapse,
  notification,
  NotificationArgsProps,
} from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import {
  RouteConfiguration,
  RoutesConfigurations,
} from "../RouteConfiguration";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { MenuInfo } from "rc-menu/lib/interface";
import { ProductDetails } from "../components/ProductDetails";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Products, ShoppingCart } from "../components";
import {
  FilterOptions,
  FilterOptionsData,
} from "../components/filter/FilterOptions";
import { ProductProps } from "../models/ProductData";

type NotificationPlacement = NotificationArgsProps["placement"];
const Context = React.createContext({ name: "Default" });

export default function MainLayout() {
  const [filterOptions, setFilterOptions] = useState<FilterOptionsData>({
    minPrice: undefined,
    maxPrice: undefined,
    sort: undefined,
    categories: [],
  });

  const [api, contextHolder] = notification.useNotification();

  const openNotification = (placement: NotificationPlacement, product:ProductProps) => {
    api.info({
      message: `${product.name} im Warenkorb hinzugefügt!`,
      description: <Context.Consumer>{() => `Hello,Defaul!`}</Context.Consumer>,
      placement,
      duration: 5
    });
  };

  const contextValue = useMemo(() => ({ name: "Ant Design" }), []);

  const [routes, setRoutes] = useState<RouteConfiguration[]>([]);
  const [currentKey, setCurrentKey] = useState<string | undefined>(undefined);
  const navigate = useNavigate();

  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: "Filter Optionen",
      children: (
        <FilterOptions
          filterOptions={filterOptions}
          setFilterOptions={setFilterOptions}
        />
      ),
    },
  ];

  useEffect(() => {
    setRoutes(RoutesConfigurations);
  }, []);

  const handleNavMenuClick = (e: MenuInfo) => {
    const key = Number(e.key);

    if (isNaN(key)) {
      navigate("/" + e.key);
      setCurrentKey(e.key);
    } else {
      navigate(routes[key].path);

      const temp = routes[key].path.split("/");
      setCurrentKey(temp[temp.length - 1]);
    }
  };

  const handleShoppingCartNavigation = () => {
    navigate("/shoppingcart");
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Context.Provider value={contextValue}>
      {contextHolder}
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
            <Menu.Item key="products">Produkte</Menu.Item>
          </Menu>
          <div>
            <Button type="primary" onClick={handleShoppingCartNavigation}>
              <span>Warenkorb</span>
              <ShoppingCartOutlined />
            </Button>
          </div>
        </Header>
        <Content className={"py-2 px-12"}>
          {/* <Button type="primary" onClick={() => openNotification('bottomRight')}>Open</Button> */}
          {currentKey === "products" ? (
            <Collapse items={items} defaultActiveKey={[]} className="my-4" />
          ) : (
            <></>
          )}
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
              <Route
                path="/products"
                element={<Products filterOptionsData={filterOptions} openNotification={openNotification}/>}
              />
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
    </Context.Provider>
  );
}
