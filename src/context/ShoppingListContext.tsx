'use client';

import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react';
import { ShoppingListItem, ItemFormValues } from '@/types/shopping-list.d';
import mockData from '@/data/mock-data.json'; 


type AddItemFunction = (item: ItemFormValues) => void;

export type SortDirection = 'ascend' | 'descend' | undefined;
export type SortKey = keyof ShoppingListItem | 'totalPrice' | undefined; 

export interface FilterState {
    search: string;
    category: string | undefined;
    subcategory: string | undefined;
    sort: {
        field: SortKey;
        order: SortDirection;
    }
}

interface ShoppingListContextType {
    list: ShoppingListItem[];
    addItem: AddItemFunction;
    filterState: FilterState;
    setFilterState: React.Dispatch<React.SetStateAction<FilterState>>;
}

const ShoppingListContext = createContext<ShoppingListContextType | undefined>(undefined);

interface ShoppingListProviderProps {
  children: ReactNode;
}


const DEFAULT_FILTER_STATE: FilterState = {
    search: '',
    category: undefined,
    subcategory: undefined,
    sort: { field: undefined, order: undefined }
}

const transformItemForState = (item: ItemFormValues): ShoppingListItem => {
  return {
    name: item.itemName,
    category: item.category,
    subcategory: item.subcategory,
    qty: item.quantity,
    price: item.price,
    date: item.date,
    isNew: true, 
  };
};


export const ShoppingListProvider: React.FC<ShoppingListProviderProps> = ({ children }) => {
  const [list, setList] = useState<ShoppingListItem[]>(mockData as ShoppingListItem[]);
  
  const [filterState, setFilterState] = useState<FilterState>(DEFAULT_FILTER_STATE);

  const addItem: AddItemFunction = (newItem) => {
    const itemToAdd = transformItemForState(newItem);
    
    setList(prevList => [itemToAdd, ...prevList]);
  };

  const contextValue = useMemo(() => ({
    list,
    addItem,
    filterState,
    setFilterState,
  }), [list, filterState]);

  return (
    <ShoppingListContext.Provider value={contextValue}>
      {children}
    </ShoppingListContext.Provider>
  );
};


export const useShoppingList = () => {
  const context = useContext(ShoppingListContext);
  if (context === undefined) {
    throw new Error('useShoppingList must be used within a ShoppingListProvider');
  }
  return context;
};