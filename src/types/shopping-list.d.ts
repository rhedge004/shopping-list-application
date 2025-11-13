import { type Dayjs } from 'dayjs';

export interface ShoppingListItem {
  name: string;
  category: string;
  subcategory: string;
  qty: number;
  price: number;
  date: string | Dayjs;
  isNew?: boolean; 
}

export interface Subcategory {
  value: string;
  label: string;
}

export interface CategoryData {
  value: string;
  label: string;
  subcategories: Subcategory[];
}

export type CategoryMap = Record<string, CategoryData>;

export interface ItemFormValues {
  itemName: string;
  category: string;
  subcategory: string;
  quantity: number;
  price: number;
  date: string | Dayjs;
}