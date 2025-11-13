import { black, white } from '@/utils/constants';
import { ThemeConfig, theme } from 'antd';

const { defaultAlgorithm, darkAlgorithm } = theme;

const commonVariables = {
  colorPrimary: '#1890ff',
  borderRadius: 4,
};

export const lightTheme: ThemeConfig = {
  algorithm: defaultAlgorithm,
  token: {
    ...commonVariables,
    colorBgContainer: white,
    colorText: black,
  },
  components: {
    Layout: {
      headerBg: white,
    },
  },
};

export const darkTheme: ThemeConfig = {
  algorithm: darkAlgorithm,
  token: {
    ...commonVariables,
    colorBgContainer: black,
    colorText: white,
  },
  components: {
    Layout: {
      headerBg: '#1f1f1f',
    },
  },
};