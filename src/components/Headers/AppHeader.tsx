"use client";

import React from "react";
import { Layout, Space } from "antd";
import Image from 'next/image'
import { DarkModeToggle } from "@/components/ui/DarkModeToggle";
import styles from "./AppHeader.module.css";
import { subBlack } from "@/utils/constants";
import { basePath } from "@/utils/constants";

const { Header } = Layout;

export const AppHeader = () => {

  return (
      <Header className={styles.formContainer} style={{ background: subBlack }}>
          <Image width={80} height={30} src={basePath + '/Logo.png'} alt={""} />
        <Space size="middle">
          <DarkModeToggle />
        </Space>
      </Header>
  );
};
