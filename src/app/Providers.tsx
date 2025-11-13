'use client';

import React, { ReactNode } from 'react';
import { ThemeProvider } from '@/context/ThemeContext';
import { ShoppingListProvider } from '@/context/ShoppingListContext';
import { AntdRegistry } from '@ant-design/nextjs-registry';

interface ProvidersProps {
  children: ReactNode;
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <AntdRegistry>
      <ThemeProvider>
        <ShoppingListProvider>
          {children}
        </ShoppingListProvider>
      </ThemeProvider>
    </AntdRegistry>
  );
};