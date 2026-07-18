"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

type MenuContextType = {
  open: boolean;
  setOpen: (v: boolean) => void;
  toggle: () => void;
};

const MenuContext = createContext<MenuContextType>({
  open: false,
  setOpen: () => {},
  toggle: () => {},
});

export function MenuProvider({
  children,
}: {
  children: ReactNode;
}) {

  const [open, setOpen] = useState(false);

  const toggle = () => setOpen(v => !v);

  return (
    <MenuContext.Provider
      value={{
        open,
        setOpen,
        toggle,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
}

export function useMenu() {
  return useContext(MenuContext);
}
