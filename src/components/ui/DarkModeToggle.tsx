'use client';

import React from 'react';
import { Switch, Typography } from 'antd';
import { useTheme } from '@/context/ThemeContext';
import { white } from '@/utils/constants';

const { Text } = Typography;

export const DarkModeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <Text style={{ color: white }}>
        Dark Mode
      </Text>
      <Switch 
        checked={isDarkMode} 
        onChange={toggleTheme} 
        loading={false}
        style={{ background: '#1890ff' }}
      />
    </div>
  );
};