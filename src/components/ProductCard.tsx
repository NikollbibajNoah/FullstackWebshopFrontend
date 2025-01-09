import React from "react";
import { ProductProps } from "../models/ProductData";
import { Button } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";

export const ProductCard: React.FC<ProductProps> = ({
  name,
  category,
  description,
  price,
  onDetailsClick,
  onAddToCartClick,
}) => {
  return (
    <div className="w-28 h-[260px] sm:w-40 sm:h-[300px] lg:w-48 lg:h-[375px] flex flex-col p-2 box-border bg-white shadow-xl rounded-lg">
      <div className="w-full aspect-square rounded flex justify-center items-center bg-green-300">
        Image Here
      </div>
      <div className="flex flex-col gap-2 h-full p-2">
        <div className="text-sm sm:text-lg font-bold truncate">{name}</div>
        <div className="text-xs sm:text-sm text-gray-500 italic">{category}</div>
        <div className="hidden lg:inline-block line-clamp-2 text-ellipsis h-8 leading-4 break-words">{description}</div>
        <div className="text-xs sm:text-sm">{price} CHF</div>
      </div>
      <div className="flex items-center sm:flex-row lg:flex-row xs:flex-col xs:gap-1 py-0 sm:py-2 justify-between">
        <Button type="primary" onClick={onAddToCartClick} className="text-xs sm:text-sm sm:w-[105px] w-[90px] lg:w-[120px]">Im Warenkorb</Button>
        <Button type="primary" shape="circle" onClick={onDetailsClick} icon={<InfoCircleOutlined />} />
      </div>
    </div>
  );
};
