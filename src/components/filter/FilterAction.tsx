import React from "react";

export interface FilterActionProps {
    title: string;
    children: React.ReactNode;
}

export const FilterAction:React.FC<FilterActionProps> = ({title, children}) => {
  return (
    <div className="bg-white h-20 p-2 rounded-md">
      <div className="mb-1">{title}</div>
      {children}
    </div>
  );
};
