import React, { createContext, useContext, useState } from "react";

export type MenuItem = {
  id: string;
  dishName: string;
  description: string;
  course: string;
  price: string;
  dateAdded: string;
};

type MenuContextType = {
  menuItems: MenuItem[];
  addMenuItem: (item: MenuItem) => void;
  clearMenu: () => void;
};

const MenuContext = createContext<MenuContextType | undefined>(
  undefined
);

export function MenuProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

const addMenuItem = (item: MenuItem) => {
  setMenuItems((currentItems) => [
    ...currentItems,
    item,
  ]);
};

const clearMenu = () => {
  setMenuItems([]);
};

  return (
    <MenuContext.Provider
      value={{
        menuItems,
        addMenuItem,
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
    throw new Error(
      "useMenu must be used inside MenuProvider"
    );
  }

  return context;
}