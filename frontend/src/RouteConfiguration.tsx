import { Products } from "./components";

export interface RouteConfiguration {
    title:string;
    path:string;
    element:JSX.Element;
}

export const RoutesConfigurations:RouteConfiguration[] = [
    {title: "Home", path: "/", element: <div className="bg-blue-300">Home</div>},
    {title: "Products", path: "products", element: <Products />},
    {title: "Sales", path: "/sales", element: <div>Sales</div>},
    {title: "New Products", path: "/newproducts", element: <div>New Products</div>}
];