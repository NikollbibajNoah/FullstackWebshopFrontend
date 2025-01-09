import { useNavigate, useParams } from "react-router-dom";
import { ProductProps } from "../models/ProductData";
import { useEffect, useState } from "react";
import Dummy from "@assets/images/dummy.png";
import { Button } from "antd";
import {
  ArrowLeftOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { addProductToCart, fetchProductById } from "../services";

export const ProductDetails = () => {
  const [product, setProduct] = useState<ProductProps | null>(null);
  const [productImages, setProductImages] = useState<string[]>([]);
  const [currentProductImage, setCurrentProductImage] = useState(1);
  const { id } = useParams<string>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchProductById(Number(id));
      setProduct(data);
    };

    fetchData();
  }, []);

  const handleAddToCart = async () => {
    await addProductToCart(product!);
  };

  const handleReturnEvent = () => {
    navigate(-1);
  };

  return (
    <div>
      <div className="mb-6">
        <Button type="default" onClick={handleReturnEvent}>
          <ArrowLeftOutlined />
          <div>Zurück</div>
        </Button>
      </div>

      <div className="flex flex-col mb-6">
        <div className="h-96 mb-2 flex justify-center items-center flex-col">
          <div className="h-full">
            <img
              src={Dummy}
              alt="product image"
              className="h-full shadow object-cover"
            />
          </div>
        </div>
        <div className="flex justify-center h-8 gap-5">
          {productImages && productImages.length > 1 ? (
            <>
              <div className="h-full aspect-square">
                <Button type="primary" shape="circle">
                  <LeftOutlined />
                </Button>
              </div>
              <div className="h-full flex items-center justify-center">
                {currentProductImage}/{productImages.length}
              </div>
              <div className="h-full aspect-square">
                <Button type="primary" shape="circle">
                  <RightOutlined />
                </Button>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>

      <div>
        <div className="mb-10">
          <div className="text-xl">
            <b>{product?.name}</b>
          </div>
          <div className="text-xl text-gray-500">{product?.category}</div>
          <div className="text-l my-5">{product?.description}</div>
          <div className="text-xl">{product?.price} CHF</div>
        </div>
        <div className="">
          <Button type="primary" className="" onClick={handleAddToCart}>
            Im Warenkorb
          </Button>
        </div>
      </div>
    </div>
  );
};
