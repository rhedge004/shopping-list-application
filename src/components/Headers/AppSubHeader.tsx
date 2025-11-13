"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faChartSimple } from '@fortawesome/free-solid-svg-icons';
import { Typography, Button, Space } from "antd";
import { useTheme } from "@/context/ThemeContext";
import styles from "./AppHeader.module.css";
import { black, white } from "@/utils/constants";

const { Title } = Typography;

interface AppSubHeaderProps {
  onViewReport: () => void;
}

export const AppSubHeader: React.FC<AppSubHeaderProps> = ({ onViewReport }) => {
  const { isDarkMode } = useTheme();

  const textColor = isDarkMode ? white : black;

  return (
    <div className={styles.subContainer}>
      <Space size="middle" align="center">
        <Title
          level={4}
          style={{
            color: textColor,
          }}
          className={styles.subContainerTitle}
        >
          <FontAwesomeIcon icon={faShoppingCart} color="#667084"  style={{ marginRight: 8 }} />
          Shopping List Application
        </Title>
      </Space>
      <Space size="middle">
        <Button
          type="default"
          icon={<FontAwesomeIcon icon={faChartSimple} flip="horizontal" />}
          onClick={onViewReport}
        >
          View Report
        </Button>
      </Space>
    </div>
  );
};
