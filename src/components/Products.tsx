import { useEffect, useState } from "react";
import { ProductProps } from "../models/ProductData";
import { ProductCard } from "./ProductCard";

export const Products = () => {
  const [products, setProducts] = useState<ProductProps[]>([]);

  useEffect(() => {
    fetch("./database/DB.json")
      .then((res) => res.json())
      .then((data) => setProducts(data.products));

    console.log(products);
  }, []);

  return (
    <div className="grid grid-cols-5 gap-4 place-items-center">
      {products.length > 0 ? (
        products.map((p: ProductProps, i: number) => (
          <ProductCard key={i} {...p} />
        ))
      ) : (
        <div>Products loading...</div>
      )}
    </div>
  );
};
