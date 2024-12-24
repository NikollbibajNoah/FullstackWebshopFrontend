import { useParams } from "react-router-dom";
import { ProductProps } from "../models/ProductData";
import { useEffect, useState } from "react";
import axios from "axios";

export const ProductDetails = () => {
  const [product, setProduct] = useState<ProductProps | null>(null);
  const { id } = useParams<string>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/products?id=${id}`);

        if (res.status === 200) {
          setProduct(res.data[0]);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="text-xl">{product?.name}</div>
      <div className="text-xl">{product?.category}</div>
      <div className="text-xl">{product?.description}</div>
      <div className="text-xl">{product?.price}</div>
    </div>
  );
};
