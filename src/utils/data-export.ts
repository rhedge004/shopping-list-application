import { ShoppingListItem } from '@/types/shopping-list.d';
import dayjs from 'dayjs';

export interface ExportableShoppingListItem extends ShoppingListItem {
  totalPrice: number;
}

const prepareDataForExport = (data: ShoppingListItem[]): ExportableShoppingListItem[] => {
  return data.map(item => ({
    ...item,
    totalPrice: item.qty * item.price,
  }));
};

const convertToCsv = (data: ExportableShoppingListItem[]): string => {
  if (data.length === 0) return '';

  const headers = Object.keys(data[0]).join(',');

  const rows = data.map(item => 
    Object.values(item).map(value => {
      const stringValue = String(value);
      if (stringValue.includes(',') || stringValue.includes('"')) {
        return `"${stringValue.replace(/"/g, '""')}"`;
      }
      return stringValue;
    }).join(',')
  ).join('\n');

  return headers + '\n' + rows;
};

const downloadFile = (data: string, filename: string, mimeType: string) => {
  const blob = new Blob([data], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const exportData = (data: ShoppingListItem[], type: 'csv' | 'json', filename: string = 'shopping_list') => {
  const exportableData = prepareDataForExport(data);
  const date = dayjs().format('YYYYMMDD');
  
  if (type === 'csv') {
    const csvContent = convertToCsv(exportableData);
    const finalFilename = `${filename}_${date}.csv`;
    downloadFile(csvContent, finalFilename, 'text/csv;charset=utf-8;');
  } else if (type === 'json') {
    const jsonContent = JSON.stringify(exportableData, null, 2);
    const finalFilename = `${filename}_${date}.json`;
    downloadFile(jsonContent, finalFilename, 'application/json');
  } else {
    console.error('Unsupported export type:', type);
  }
};