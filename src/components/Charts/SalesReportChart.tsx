'use client';

import React, { useMemo } from 'react';
import { Card, Row, Col, Statistic, Typography } from 'antd';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from 'chart.js';

import { useShoppingList } from '@/context/ShoppingListContext';
import { ShoppingListItem } from '@/types/shopping-list.d';

const { Text } = Typography;

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const formatCurrency = (value: number) => `$${value.toFixed(2)}`;


interface ReportMetrics {
    totalSpending: number;
    highestCostItem: ShoppingListItem | null;
    averageCost: number;
    chartData: ChartData<'bar', number[], string>;
}

const useSalesReportData = (list: ShoppingListItem[]): ReportMetrics => {
  return useMemo(() => {
    let totalSpending = 0;
    let totalQuantity = 0;
    let highestCost = 0;
    let highestCostItem: ShoppingListItem | null = null;
    const salesByCategory: Record<string, number> = {};

    list.forEach(item => {
      const itemTotal = item.qty * item.price;
      
      totalSpending += itemTotal;
      totalQuantity += item.qty;
      
      if (itemTotal > highestCost) {
        highestCost = itemTotal;
        highestCostItem = item;
      }
      
      salesByCategory[item.category] = (salesByCategory[item.category] || 0) + itemTotal;
    });

    const averageCost = totalQuantity > 0 ? totalSpending / totalQuantity : 0;

    const labels = Object.keys(salesByCategory);
    const dataValues = Object.values(salesByCategory);

    const chartData: ChartData<'bar', number[], string> = {
      labels: labels,
      datasets: [
        {
          label: 'Total Sales',
          data: dataValues,
          backgroundColor: '#1890ff', 
          borderColor: '#1890ff',
          borderWidth: 1,
        },
      ],
    };

    return {
      totalSpending,
      highestCostItem,
      averageCost,
      chartData,
    };
  }, [list]);
};


export const SalesReportChart: React.FC = () => {
  const { list } = useShoppingList();
  const { totalSpending, highestCostItem, averageCost, chartData } = useSalesReportData(list);
  
  if (list.length === 0) {
    return <Text type="secondary">No items available to generate a sales report.</Text>;
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Total Sales by Category',
      },
    },
    scales: {
        y: {
            title: {
                display: true,
                text: 'Total Spent ($)'
            }
        }
    }
  };

  return (
    <div>
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={8}>
          <Card variant='outlined'>
            <Statistic 
              title="Total Spending" 
              value={totalSpending} 
              precision={2} 
              prefix="$" 
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card variant='outlined'>
            <Statistic 
              title="Highest Cost Item" 
              value={highestCostItem ? formatCurrency(highestCostItem.qty * highestCostItem.price) : 'N/A'}
              suffix={highestCostItem ? ` (${highestCostItem.name})` : ''} 
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card variant='outlined'>
            <Statistic 
              title="Average Cost (Per Item Unit)" 
              value={averageCost} 
              precision={2} 
              prefix="$" 
            />
          </Card>
        </Col>
      </Row>

      <Card variant='outlined' title="Category Sales Breakdown">
        <div style={{ height: 350 }}>
          <Bar options={chartOptions} data={chartData} />
        </div>
      </Card>
    </div>
  );
};