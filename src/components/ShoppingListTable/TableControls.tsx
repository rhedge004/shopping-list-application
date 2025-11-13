"use client";

import React, { useState, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileArrowDown } from "@fortawesome/free-solid-svg-icons";
import { Row, Col, Input, Select, Button, Typography, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useShoppingList } from "@/context/ShoppingListContext";
import {
  CATEGORY_OPTIONS,
  CATEGORY_MAP,
  white,
  black,
} from "@/utils/constants";
import { exportData } from "@/utils/data-export";
import { useTheme } from "@/context/ThemeContext";

const { Text } = Typography;

export const TableControls: React.FC = () => {
  const { filterState, setFilterState, list } = useShoppingList();
  const { isDarkMode } = useTheme();

  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    undefined
  );

  const subcategoryOptions = useMemo(() => {
    return selectedCategory
      ? CATEGORY_MAP[selectedCategory]?.subcategories
      : [];
  }, [selectedCategory]);

  const handleFilterChange = (
    key: keyof Omit<typeof filterState, "sort">,
    value: string | undefined
  ) => {
    setFilterState((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleCategoryChange = (value: string | undefined) => {
    setSelectedCategory(value);
    handleFilterChange("category", value);
    handleFilterChange("subcategory", undefined);
  };

  const handleSubcategoryChange = (value: string | undefined) => {
    handleFilterChange("subcategory", value);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFilterChange("search", e.target.value.toLowerCase());
  };

  const handleExport = (type: "csv" | "json") => {
    exportData(list, type);
  };

  return (
    <Row
      align="middle"
      justify="space-between"
      style={{
        padding: '0 20px',
        background: isDarkMode ? black : white,
        height: 100,
        borderTop: isDarkMode ? "1px solid #1A1D24" : "1px solid #f0f0f0",
      }}
    >
      <Col>
        <Text style={{ fontSize: "28px", fontWeight: "bold" }}>
          {list.length} Items
        </Text>
      </Col>

      <Col>
        <Space size="middle" style={{ paddingRight: 15 }}>
          <Text>Filter By</Text>
        </Space>
        <Space size="middle">
          <Select
            placeholder="Select Category"
            allowClear
            style={{ width: 180 }}
            options={CATEGORY_OPTIONS}
            onChange={handleCategoryChange}
            value={filterState.category}
          />

          <Select
            placeholder="Select Sub Category"
            allowClear
            style={{ width: 180 }}
            options={subcategoryOptions}
            disabled={!selectedCategory}
            onChange={handleSubcategoryChange}
            value={filterState.subcategory}
          />

          <Input
            placeholder="Search"
            prefix={<SearchOutlined />}
            style={{ width: 250 }}
            onChange={handleSearch}
            value={filterState.search}
          />

          <Button
            type="default"
            icon={<FontAwesomeIcon icon={faFileArrowDown} />}
            onClick={() => handleExport("csv")}
          >
            Export Data
          </Button>
        </Space>
      </Col>
    </Row>
  );
};
