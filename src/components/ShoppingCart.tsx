import { useEffect, useState } from "react";
import { ShoppingCartElement, ShoppingCartElementProps } from "./ShoppingCartElement";
import axios from "axios";

export const ShoppingCart = () => {
  const [products, setProducts] = useState<ShoppingCartElementProps[] | undefined>(undefined);

  const fetchData = async () => {
    try {
        const res = await axios.get("http://localhost:5000/shoppingcart");

        if (res.status === 200) {
            const seen: number[] = [];
            const duplicates: ShoppingCartElementProps[] = [];

            res.data.map((p: ShoppingCartElementProps) => {
                p.quantity = 1;
                if (seen.includes(p.productId)) {
                    duplicates.push(p);
                } else {
                    seen.push(p.productId);
                }
            })

            console.log(duplicates)
          setProducts(res.data);
        }
    } catch (error) {
      console.error(error);
        
    }
  }
  useEffect(() => {
    fetchData();
  }, [])

  return (
    <>
      <div>
        {products ? (
          products.length > 0 ? (
            products.map((product: ShoppingCartElementProps, i: number) => (
              <ShoppingCartElement key={i} {...product} onClick={() => console.log("Pressed:", i)} />
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
