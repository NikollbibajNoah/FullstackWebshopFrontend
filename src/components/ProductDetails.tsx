import { useNavigate, useParams } from "react-router-dom";
import { ProductProps } from "../models/ProductData";
import { useEffect, useState } from "react";
import axios from "axios";
import Dummy from "@assets/images/dummy.png";
import { Button } from "antd";
import {
  ArrowLeftOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { ShoppingCartProductsProps } from "./Products";

export const ProductDetails = () => {
  const [product, setProduct] = useState<ProductProps | null>(null);
  const [productImages, setProductImages] = useState<string[]>([]);
  const [currentProductImage, setCurrentProductImage] = useState(1);
  const { id } = useParams<string>();
  const navigate = useNavigate();

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

        const res = await axios.get(`${endpoint}/${id}`);

        if (res.status === 200) {
          setProduct(res.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleAddToCart = async () => {
    console.log("Added to cart:", product);
    try {
      if (product) {
        const data: ShoppingCartProductsProps = {
          productId: product.id,
          productName: product.name,
          productPrice: product.price,
          productCategory: product.category,
          productDescription: product.description,
          productImage: product.image ? product.image : "",
          quantity: 1,
        };
        const checkRes = await axios.get("http://localhost:5000/shoppingcart");

        if (checkRes.status === 200) {
          const shoppingCartProducts: ShoppingCartProductsProps[] =
            checkRes.data;

          const productExists = shoppingCartProducts.find(
            (cartProduct) => cartProduct.productId === product.id
          );

          if (productExists) {
            productExists.quantity++;
            console.log("Product already exists in cart");
            await axios.put(
              `http://localhost:5000/shoppingcart/${productExists.id}`,
              productExists
            );
            return;
          }
        }

        const res = await axios.post(
          "http://localhost:5000/shoppingcart",
          data
        );

        if (res.status === 200) {
          console.log("Product added to cart", res.data);
        }
      }
    } catch (error) {
      console.error(error);
    }
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
