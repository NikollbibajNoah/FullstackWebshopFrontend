import React from "react";
import Dummy from "@assets/images/dummy.png";
import { Button, InputNumber } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { ShoppingCartProductsProps } from "./Products";

export interface ShoppingCartElementProps extends ShoppingCartProductsProps {
  quantity: number;
  onClick: () => void;
}

export const ShoppingCartElement: React.FC<ShoppingCartElementProps> = ({
  productName,
  productCategory,
  productPrice,
  productImage,
  quantity,
  onClick,
}) => {
  return (
    <div className="w-full h-20 mb-5 flex shadow rounded-lg">
      <div className="w-full flex cursor-pointer" onClick={onClick}>
        <div className="h-full aspect-square bg-blue-500">
          <div className="h-full">
            <img src={productImage ? productImage : Dummy} alt="Image" />
          </div>
        </div>
        <div className="h-full flex flex-col justify-center px-2">
          <div>
            <b>{productName}</b>
          </div>
          <div className="text-gray-500">
            <em>{productCategory}</em>
          </div>
          <div>{productPrice} CHF</div>
        </div>
      </div>
      <div className="h-full w-28 ml-auto flex flex-col justify-center gap-2 px-2">
        <InputNumber
          className="w-full"
          min={1}
          max={10}
          defaultValue={quantity}
        />
        <Button className="w-full" type="primary" danger>
          Entfernen <DeleteOutlined />
        </Button>
      </div>
    </div>
  );
};
