import { useEffect, useState } from "react";
import { ProductProps } from "../models/ProductData";
import { ProductCard } from "./ProductCard";
import { useNavigate } from "react-router-dom";

export const Products = () => {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const navigate = useNavigate();

  const handleNavigation = (product: ProductProps) => {
    navigate(`/products/${product.name}`);
  };

  useEffect(() => {
    fetch("./database/DB.json")
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
  }, []);

  return (
    <div className="grid grid-cols-5 gap-4 place-items-center">
      {products.length > 0 ? (
        products.map((p: ProductProps, i: number) => (
          <ProductCard
            key={i}
            {...p}
            onDetailsClick={() => handleNavigation(p)}
          />
        ))
      ) : (
        <div>Products loading...</div>
      )}
    </div>
  );
};
