'use client';

import React, { useMemo } from 'react';
import { Table, Tag, Typography } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import dayjs from 'dayjs';

import { useShoppingList } from '@/context/ShoppingListContext';
import type { SortKey, SortDirection, FilterState } from '@/context/ShoppingListContext';
import type { ShoppingListItem } from '@/types/shopping-list.d';
import { CustomSortIcon } from './CustomSorterIcon';

const { Text } = Typography;


interface TableDataSource extends ShoppingListItem {
  key: string;
  totalPrice: number;
}

const useFilteredData = (list: ShoppingListItem[], filterState: FilterState): TableDataSource[] => {
  return useMemo(() => {
    let processedData: TableDataSource[] = list.map((item, index) => ({
      ...item,
      key: `${item.name}-${index}`,
      totalPrice: item.qty * item.price,
    }));

    const { search, category, subcategory } = filterState; 

    if (search || category || subcategory) {
      processedData = processedData.filter(item => {
        const nameMatch = search 
          ? item.name.toLowerCase().includes(search.toLowerCase()) 
          : true;

        const categoryMatch = category
          ? item.category === category
          : true;

        const subcategoryMatch = subcategory
          ? item.subcategory === subcategory
          : true;

        return nameMatch && categoryMatch && subcategoryMatch;
      });
    }

    return processedData;
  }, [list, filterState]);
};


const formatCurrency = (value: number) => `$${value.toFixed(2)}`;

const columns: ColumnsType<TableDataSource> = [
  {
    title: 'Item Name',
    dataIndex: 'name',
    key: 'name',
    sorter: (a, b) => a.name.localeCompare(b.name),
    sortIcon: (props) => <CustomSortIcon sortOrder={props.sortOrder} />,
    render: (text, record) => (
      <Text>
        {text}
        {record.isNew && (
          <Tag color="blue" style={{ marginLeft: 8 }}>
            New
          </Tag>
        )}
      </Text>
    ),
    width: 200,
  },
  {
    title: 'Category',
    dataIndex: 'category',
    key: 'category',
    sorter: (a, b) => a.category.localeCompare(b.category),
    sortIcon: (props) => <CustomSortIcon sortOrder={props.sortOrder} />,
    width: 120,
  },
  {
    title: 'Sub Category',
    dataIndex: 'subcategory',
    key: 'subcategory',
    sorter: (a, b) => a.subcategory.localeCompare(b.subcategory),
    sortIcon: (props) => <CustomSortIcon sortOrder={props.sortOrder} />,
    width: 120,
  },
  {
    title: 'Quantity',
    dataIndex: 'qty',
    key: 'qty',
    sorter: (a, b) => a.qty - b.qty, 
    sortIcon: (props) => <CustomSortIcon sortOrder={props.sortOrder} />,
    width: 100,
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
    render: (price: number) => formatCurrency(price),
    sorter: (a, b) => a.price - b.price,
    sortIcon: (props) => <CustomSortIcon sortOrder={props.sortOrder} />,
    width: 100,
  },
  {
    title: 'Total',
    dataIndex: 'totalPrice',
    key: 'totalPrice',
    render: (totalPrice: number) => (
      <Text strong>{formatCurrency(totalPrice)}</Text> 
    ),
    sorter: (a, b) => a.totalPrice - b.totalPrice, // Sortable Total Price
    sortIcon: (props) => <CustomSortIcon sortOrder={props.sortOrder} />,
    width: 100,
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    render: (date: string) => dayjs(date).format('DD MMM YYYY'),
    sorter: (a, b) => dayjs(a.date).unix() - dayjs(b.date).unix(), // Sort by date
    sortIcon: (props) => <CustomSortIcon sortOrder={props.sortOrder} />,
    width: 130,
  },
];


export const ListTable: React.FC = () => {
  const { list, setFilterState, filterState } = useShoppingList();
  
  const data = useFilteredData(list, filterState);

  const handleTableChange: TableProps<TableDataSource>['onChange'] = (
    pagination, 
    filters, 
    sorter, 
    extra
  ) => {
    if (extra.action === 'sort') {
      const sortItem = Array.isArray(sorter) ? sorter[0] : sorter;
      
      const field = sortItem?.field as SortKey;
      const order = sortItem?.order as SortDirection;

      setFilterState(prev => ({
        ...prev,
        sort: { field, order },
      }));
    }
  };

  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={false} 
      onChange={handleTableChange}
      scroll={{ y: 600 }} 
      size="middle"
      rowKey="key"
      locale={{ emptyText: 'No shopping items found matching your criteria.' }}
    />
  );
};