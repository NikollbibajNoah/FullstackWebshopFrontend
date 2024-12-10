import { useParams } from "react-router-dom";

export const ProductDetails = () => {
  const { productName } = useParams<string>();

  return <div className="text-xl">{productName}</div>;
};
