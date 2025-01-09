import { useEffect, useState } from "react";
import { ProductProps } from "../models/ProductData";
import { ProductCard } from "./ProductCard";
import { useNavigate } from "react-router-dom";
import { addProductToCart, fetchProducts } from "../services";

export interface ShoppingCartProductsProps {
  id?: number;
  productId: number;
  productName: string;
  productCategory: string;
  productPrice: number;
  productDescription: string;
  productImage: string;
  quantity: number;
}

export const Products = () => {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const navigate = useNavigate();

  const handleNavigation = (product: ProductProps) => {
    navigate(`/products/${product.id}`);
  };

  const handleAddToCart = async (product: ProductProps) => {
    await addProductToCart(product);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchProducts();
      setProducts(data);
    }

    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 place-items-center">
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
