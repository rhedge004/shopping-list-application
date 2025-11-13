"use client";

import React, { useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  Select,
  DatePicker,
  Button,
  Row,
  Col,
} from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { PlusOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

import { useShoppingList } from "@/context/ShoppingListContext";
import {
  CATEGORY_OPTIONS,
  CATEGORY_MAP,
  subBlack,
  subWhite,
} from "@/utils/constants";
import { ItemFormValues } from "@/types/shopping-list.d";
import styles from "./AddItemForm.module.css";
import { useTheme } from "@/context/ThemeContext";

type FormInstance = ItemFormValues;

export const AddItemForm: React.FC = () => {
  const [form] = Form.useForm<FormInstance>();
  const { addItem } = useShoppingList();
  const { isDarkMode } = useTheme();

  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    undefined
  );

  const subcategoryOptions = selectedCategory
    ? CATEGORY_MAP[selectedCategory]?.subcategories
    : [];

  const onFinish = (values: FormInstance) => {
    const submitValues: ItemFormValues = {
      ...values,
      date: values.date
        ? dayjs(values.date).format("YYYY-MM-DD")
        : dayjs().format("YYYY-MM-DD"),
    };

    addItem(submitValues);

    form.resetFields([
      "itemName",
      "category",
      "subcategory",
      "quantity",
      "price",
    ]);
    setSelectedCategory(undefined);
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    form.setFieldsValue({ subcategory: undefined });
  };

  const initialValues: Partial<ItemFormValues> = {
    quantity: 1,
    price: 0,
    date: dayjs(),
  };

  return (
    <div
      className={styles.formContainer}
      style={{
        background: isDarkMode ? subBlack : subWhite,
        borderTop: isDarkMode ? "1px solid #1A1D24" : "1px solid #f0f0f0",
      }}
    >
      <Form
        form={form}
        name="add_item_form"
        onFinish={onFinish}
        initialValues={initialValues}
        layout="vertical"
      >
        <Row gutter={5} align="bottom">
          <Col span={4}>
            <Form.Item
              name="itemName"
              label="Add New Item"
              rules={[{ required: true, message: "Please enter item name!" }]}
            >
              <Input placeholder="Enter Item Name" />
            </Form.Item>
          </Col>

          <Col span={4}>
            <Form.Item
              name="category"
              label="Category"
              rules={[{ required: true, message: "Select a category!" }]}
            >
              <Select
                placeholder="Select"
                options={CATEGORY_OPTIONS}
                onChange={handleCategoryChange}
              />
            </Form.Item>
          </Col>

          <Col span={4}>
            <Form.Item
              name="subcategory"
              label="Sub Category"
              rules={[{ required: true, message: "Select a subcategory!" }]}
            >
              <Select
                placeholder="Select"
                disabled={!selectedCategory}
                options={subcategoryOptions}
              />
            </Form.Item>
          </Col>

          <Col span={3}>
            <Form.Item
              name="quantity"
              label="Quantity"
              rules={[{ required: true, message: "Enter quantity!" }]}
            >
              <InputNumber
                min={1}
                step={1}
                style={{ width: "100%" }}
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
              />
            </Form.Item>
          </Col>

          <Col span={3}>
            <Form.Item
              name="price"
              label="Price"
              rules={[{ required: true, message: "Enter price!" }]}
            >
              <InputNumber
                min={0}
                addonAfter={
                  <Select
                    defaultValue="$"
                    options={[
                      {
                        value: "$",
                        label: <FontAwesomeIcon icon={faDollarSign} />,
                      },
                    ]}
                  >
                    {" "}
                  </Select>
                }
                formatter={(value) =>
                  `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
              />
            </Form.Item>
          </Col>

          <Col span={3}>
            <Form.Item
              name="date"
              label="Date"
              rules={[{ required: true, message: "Select date!" }]}
            >
              <DatePicker style={{ width: "100%" }} format="DD MMM YYYY" />
            </Form.Item>
          </Col>

          <Col span={2}>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                icon={<PlusOutlined />}
                style={{ width: "100%", marginLeft: 30 }}
              >
                Add Item
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
