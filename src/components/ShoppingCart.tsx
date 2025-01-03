import { useEffect, useState } from "react";
import {
  ShoppingCartElement,
  ShoppingCartElementProps,
} from "./ShoppingCartElement";
import axios from "axios";

export const ShoppingCart = () => {
  const [products, setProducts] = useState<
    ShoppingCartElementProps[] | undefined
  >(undefined);

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/shoppingcart");

      if (res.status === 200) {
        const productsMap = new Map<number, ShoppingCartElementProps>(); //Convert into map

        res.data.forEach((product: ShoppingCartElementProps) => {
          if (productsMap.has(product.productId)) {
            //Check if product is already in the map
            const existingProduct = productsMap.get(product.productId)!;

            existingProduct.quantity += product.quantity; //Add quantity to existing product
          } else {
            productsMap.set(product.productId, { ...product });
          }
        });

        const products = Array.from(productsMap.values());

        setProducts(products);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateProductQuantity = async (
    product: ShoppingCartElementProps,
    quantity: number
  ) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/shoppingcart/${product.id}`,
        { ...product, quantity }
      );

      if (res.status === 200) {
        setProducts((prevProducts) =>
          prevProducts?.map((product: ShoppingCartElementProps) =>
            product.productId === product.productId
              ? { ...product, quantity }
              : product
          )
        );
      }
      console.log(products);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteFromCart = async (product: ShoppingCartElementProps) => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/shoppingcart/${product.id}`
      );

      if (res.status === 200) {
        setProducts((prevProducts) =>
          prevProducts?.filter((p) => p.id !== product.id)
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div>
        {products ? (
          products.length > 0 ? (
            products.map((product: ShoppingCartElementProps, i: number) => (
              <ShoppingCartElement
                key={i}
                {...product}
                onClick={() => console.log("Pressed:", i)}
                onQuantityChange={(quantity: number) =>
                updateProductQuantity(product, quantity)}
                onDelete={() => deleteFromCart(product)}
              />
            ))
          ) : (
            <div>
              Dein Warenkorb ist so gut wie leer. Finde tolle Produkte in
              unserem Shop😁🛍️
            </div>
          )
        ) : (
          <div>Produkte werden geladen...</div>
        )}
      </div>
    </>
  );
};
