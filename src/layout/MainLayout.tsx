import { Button } from "antd";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { RouteConfiguration, RoutesConfigurations } from "../RouteConfiguration";

export default function MainLayout() {
  const [routes, setRoutes] = useState<RouteConfiguration[]>([]);

  useEffect(() => {
    setRoutes(RoutesConfigurations);
  }, []);

  return (
    <>
      <h1>Mainlayout</h1>
      <Button type="primary">Hello!</Button>
      <Routes>
        {routes.map((route:RouteConfiguration, i:number) => (
          <Route key={i} path={route.path} element={route.element} />
        ))}
      </Routes>
    </>
  );
}
