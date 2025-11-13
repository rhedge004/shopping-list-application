'use client';

import React, { useState, Suspense, lazy } from 'react';
import { Layout, Modal, Spin } from 'antd';
import { AppHeader } from '@/components/Headers/AppHeader';
import { AddItemForm } from '@/components/AddItemForm/AddItemForm';
import { TableControls } from '@/components/ShoppingListTable/TableControls';
import { ListTable } from '@/components/ShoppingListTable/ListTable';
import { useTheme } from '@/context/ThemeContext';
import { black, subWhite, white } from '@/utils/constants';
import { AppSubHeader } from '@/components/Headers/AppSubHeader';

const { Content } = Layout;

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
const SalesReportChart = lazy(() => 
  delay(1000).then(() => 
    import('@/components/Charts/SalesReportChart').then(module => ({ 
      default: module.SalesReportChart 
    }))
  )
);

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isDarkMode } = useTheme();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const contentBgColor = isDarkMode ? black : white;
  
  const mainLayoutStyle: React.CSSProperties = {
    minHeight: '100vh',
    backgroundColor: contentBgColor, 
  };

  return (
    <Layout style={mainLayoutStyle}>
      <AppHeader />
      <Content>
        <AppSubHeader onViewReport={showModal} />
        <div style={{ background: isDarkMode ? black : subWhite }}>
          <AddItemForm />
          <TableControls />
          <ListTable />
        </div>
      </Content>

      <Modal
        title="Sales Report Visualization"
        open={isModalOpen}
        onCancel={handleClose}
        footer={null} 
        width={900}
      >
        <Suspense 
          fallback={<Spin style={{ display: 'block', margin: '50px auto' }} />}
        >
          {isModalOpen && <SalesReportChart />}
        </Suspense>
      </Modal>
    </Layout>
  );
}