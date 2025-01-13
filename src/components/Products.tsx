import React, { useEffect, useState } from "react";
import { ProductProps } from "../models/ProductData";
import { ProductCard } from "./ProductCard";
import { useNavigate } from "react-router-dom";
import { addProductToCart, fetchProducts } from "../services";
import { Spin } from "antd";
import { FilterOptionsData } from "./FilterOptions";

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

export interface ProductsPageProps {
  filterOptionsData: FilterOptionsData;
}

export const Products: React.FC<ProductsPageProps> = ({
  filterOptionsData,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
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
      setIsLoading(true);
      const data = await fetchProducts();

      let temp = data;

      if (data) {
        const min = filterOptionsData.minPrice;
        const max = filterOptionsData.maxPrice;

        if (min && max) {
          temp = temp.filter(
            (p: ProductProps) => p.price >= min && p.price <= max
          );
        }

        if (filterOptionsData.categories.length > 0) {
          temp = temp.filter((p: ProductProps) =>
            filterOptionsData.categories.includes(p.category)
          );
        }

        temp = temp.sort((a: ProductProps, b: ProductProps) =>
          filterOptionsData.sort === "1" ? a.price - b.price : b.price - a.price
        );
      }

      setProducts(temp);
      setIsLoading(false);
    };

    fetchData();
  }, [filterOptionsData]);

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center">
          <Spin size="large" />
        </div>
      ) : (
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
            <div>Es wurden keine Produkte gefunden!</div>
          )}
        </div>
      )}
    </>
  );
};
