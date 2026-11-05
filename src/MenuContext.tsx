import React, { createContext, useContext, useState } from "react";

export type MenuItem = {
  id: string;
  dishName: string;
  description: string;
  course: string;
  price: string;
  dateAdded: string;
  image?: string;
};

type MenuContextType = {
  menuItems: MenuItem[];
  addMenuItem: (item: MenuItem) => void;
  updateMenuItem: (item: MenuItem) => void;
  deleteMenuItem: (id: string) => void;
  clearMenu: () => void;
};

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export function MenuProvider({ children }: { children: React.ReactNode }) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  const addMenuItem = (item: MenuItem) => {
    setMenuItems((currentItems) => [...currentItems, item]);
  };

  const updateMenuItem = (updatedItem: MenuItem) => {
    setMenuItems((currentItems) =>
      currentItems.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
  };

  const deleteMenuItem = (id: string) => {
    setMenuItems((currentItems) => currentItems.filter((item) => item.id !== id));
  };

  const clearMenu = () => {
    setMenuItems([]);
  };

  return (
    <MenuContext.Provider
      value={{
        menuItems,
        addMenuItem,
        updateMenuItem,
        deleteMenuItem,
        clearMenu,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
}

export function useMenu() {
  const context = useContext(MenuContext);

  if (!context) {
    throw new Error("useMenu must be used inside MenuProvider");
  }

  return context;
}