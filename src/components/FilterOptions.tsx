import { ClearOutlined } from "@ant-design/icons";
import { Button, InputNumber, Select, Space } from "antd";
import { FilterAction } from "./FilterAction";
import { useState } from "react";

export interface FilterOptionsData {
  minPrice: number | undefined;
  maxPrice: number | undefined;
  sort: "-1" | "1" | undefined;
  categories: string[];
}

export const FilterOptions = () => {
  const [filterOptions, setFilterOptions] = useState<FilterOptionsData>({
    minPrice: undefined,
    maxPrice: undefined,
    sort: undefined,
    categories: [],
  });

  const handlePriceInputChange = (str: string, type: "Min" | "Max") => {
    const value = Number(str);

    if (type === "Min") {
      setFilterOptions((prev) => ({
        ...prev,
        minPrice: value,
      }));
    } else if (type === "Max") {
      setFilterOptions((prev) => ({
        ...prev,
        maxPrice: value,
      }));
    }
  };

  const clearPriceFilter = () => {
    setFilterOptions((prev) => ({
      ...prev,
      minPrice: undefined,
      maxPrice: undefined,
    }));
  };

  const handleSortChange = (value: string) => {
    if (value === "1") {
      setFilterOptions((prev) => ({
        ...prev,
        sort: value,
      }));
    } else if (value === "-1") {
      setFilterOptions((prev) => ({
        ...prev,
        sort: value,
      }));
    }

    console.log(filterOptions);
  }

  const clearSortFilter = () => {
    setFilterOptions((prev) => ({
      ...prev,
        sort: undefined
    }));

    console.log(filterOptions)
  };

  const handleCategoryChange = (value: string[]) => {
    setFilterOptions((prev) => ({
      ...prev,
      categories: value,
    }));
  }

  const clearCategoryFilter = () => {
    setFilterOptions((prev) => ({
      ...prev,
      categories: [],
    }));

    console.log(filterOptions);
  }

  return (
    <div className="flex flex-col">
      <div className="text-lg font-bold">Filter</div>

      <div className="py-2 h-full flex gap-2 overflow-x-auto overflow-y-hidden">
        <FilterAction title="Preis">
          <div className="flex gap-2">
            <InputNumber
            value={filterOptions.minPrice}
              onChange={(e) => e && handlePriceInputChange(e.toString(), "Min")}
              placeholder="min"
              className="w-10 sm:w-16"
            />
            <InputNumber
                value={filterOptions.maxPrice}
              onChange={(e) => e && handlePriceInputChange(e.toString(), "Max")}
              placeholder="max"
              className="w-10 sm:w-16"
            />
            <Button type="primary" className="w-8 h-8" onClick={clearPriceFilter}>
              <ClearOutlined />
            </Button>
          </div>
        </FilterAction>

        <FilterAction title="Sortieren nach Preis:">
          <div className="flex gap-2">
            <Space wrap>
              <Select
                value={filterOptions.sort}
                className="w-28"
                options={[
                  { label: "Aufsteigend", value: "1" },
                  { label: "Absteigend", value: "-1" },
                ]}
                onChange={(value: string) => handleSortChange(value)}
              />
            </Space>
            <Button type="primary" className="w-8 h-8" onClick={clearSortFilter}>
              <ClearOutlined />
            </Button>
          </div>
        </FilterAction>

        <FilterAction title="Kategorien">
          <div className="flex gap-2">
            <Space wrap>
              <Select
                mode="multiple"
                placeholder="Wähle Kategorien"
                className="w-28"
                value={filterOptions.categories}
                options={[
                  { label: "Clothing", value: "Clothing" },
                  { label: "Home", value: "Home" },
                  { label: "Sports", value: "Sports" },
                  { label: "Electronics", value: "Electronics" },
                ]}
                onChange={(value: string[]) => handleCategoryChange(value)}
              />
            </Space>
            <Button type="primary" className="w-8 h-8" onClick={clearCategoryFilter}>
              <ClearOutlined />
            </Button>
          </div>
        </FilterAction>
      </div>
    </div>
  );
};
