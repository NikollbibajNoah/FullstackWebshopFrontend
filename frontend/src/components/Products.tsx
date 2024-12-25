import { useEffect, useState } from "react";
import { ProductProps } from "../models/ProductData";
import { ProductCard } from "./ProductCard";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Products = () => {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const navigate = useNavigate();

  const handleNavigation = (product: ProductProps) => {
    navigate(`/products/${product.id}`);
  };

  useEffect(() => {
    // const checkConnection = async () => {
    //   try {
    //     const res = await axios.get("http://localhost:5000");

    //     return res.status === 200;
    //   } catch (error) {
    //     console.error(error);
    //     return false;
    //   }
    // }

    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/products");

        if (res.status === 200) {
          setProducts(res.data);
          console.log(res.data)
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
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
