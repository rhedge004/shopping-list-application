import { CategoryData, CategoryMap } from "@/types/shopping-list.d";

export const CATEGORY_DATA: CategoryData[] = [
  {
    value: 'Dairy',
    label: 'Dairy',
    subcategories: [
      { value: 'Milk', label: 'Milk' },
      { value: 'Cheese', label: 'Cheese' },
      { value: 'Eggs', label: 'Eggs' },
    ],
  },
  {
    value: 'Bakery',
    label: 'Bakery',
    subcategories: [
      { value: 'Bread', label: 'Bread' },
      { value: 'Pastries', label: 'Pastries' },
      { value: 'Buns', label: 'Buns' },
    ],
  },
  {
    value: 'Fruits',
    label: 'Fruits',
    subcategories: [
      { value: 'Apples', label: 'Apples' },
      { value: 'Oranges', label: 'Oranges' },
      { value: 'Bananas', label: 'Bananas' },
    ],
  },
  {
    value: 'Vegetables',
    label: 'Vegetables',
    subcategories: [
      { value: 'Tomatoes', label: 'Tomatoes' },
      { value: 'Carrots', label: 'Carrots' },
      { value: 'Potatoes', label: 'Potatoes' },
    ],
  },
  {
    value: 'Meat',
    label: 'Meat',
    subcategories: [
      { value: 'Chicken', label: 'Chicken' },
      { value: 'Beef', label: 'Beef' },
      { value: 'Fish', label: 'Fish' },
    ],
  },
  {
    value: 'Grains',
    label: 'Grains',
    subcategories: [
      { value: 'Rice', label: 'Rice' },
      { value: 'Pasta', label: 'Pasta' },
      { value: 'Oats', label: 'Oats' },
    ],
  },
  {
    value: 'Snacks',
    label: 'Snacks',
    subcategories: [
      { value: 'Chips', label: 'Chips' },
      { value: 'Cookies', label: 'Cookies' },
      { value: 'Nuts', label: 'Nuts' },
    ],
  },
  {
    value: 'Beverages',
    label: 'Beverages',
    subcategories: [
      { value: 'Water', label: 'Water' },
      { value: 'Soda', label: 'Soda' },
      { value: 'Juice', label: 'Juice' },
    ],
  },
];

export const CATEGORY_MAP: CategoryMap = CATEGORY_DATA.reduce(
  (acc, category) => {
    acc[category.value] = category;
    return acc;
  },
  {} as CategoryMap
);

export const CATEGORY_OPTIONS = CATEGORY_DATA.map((cat) => ({
  value: cat.value,
  label: cat.label,
}));

export const black = "#0c0d0d";
export const subBlack = "#121212" 
export const white = "#fff";
export const subWhite = "#f9fafb";
