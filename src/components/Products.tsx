import { useEffect, useState } from "react";
import { ProductProps } from "../models/ProductData";
import { ProductCard } from "./ProductCard";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export interface ShoppingCartProductsProps {
  id?: number;
  productId: number;
  productName: string;
  productCategory: string;
  productPrice: number;
  productDescription: string;
  productImage: string;
}

export const Products = () => {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const navigate = useNavigate();

  const handleNavigation = (product: ProductProps) => {
    navigate(`/products/${product.id}`);
  };

  const handleAddToCart = async (product: ProductProps) => {
    console.log("Added to cart:", product);
    try {
      const data: ShoppingCartProductsProps = {
        productId: product.id,
        productName: product.name,
        productPrice: product.price,
        productCategory: product.category,
        productDescription: product.description,
        productImage: product.image ? product.image : "",
      }
      const res = await axios.post("http://localhost:5000/shoppingcart", data);
      
      if (res.status === 200) {
        console.log("Product added to cart", res.data);
      }
    } catch (error) {
      console.error(error);
      
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const isDev = import.meta.env.VITE_DEV_MODE;

        let endpoint: string = "";

        if (isDev === "true") {
          endpoint = "http://localhost:5000/products";
        } else {
          endpoint = "https://localhost:7071/StoreProducts";
        }

        const res = await axios.get(endpoint);

        if (res.status === 200) {
          setProducts(res.data);
          console.log(res.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

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
            onAddToCartClick={() => handleAddToCart(p)}
          />
        ))
      ) : (
        <div>Products loading...</div>
      )}
    </div>
  );
};
