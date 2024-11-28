export interface RouteConfiguration {
    title:string;
    path:string;
    element:JSX.Element;
}


export const RoutesConfigurations:RouteConfiguration[] = [
    {title: "Home", path: "/", element: <div>Home</div>},
    {title: "Sales", path: "/sales", element: <div>Sales</div>},
    {title: "New Products", path: "/newproducts", element: <div>New Products</div>}
];