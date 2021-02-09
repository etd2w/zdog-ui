import { useEffect, useState } from "react";

export function useContextMenu(initialState) {
  const [isOpen, setIsOpen] = useState(initialState);

  useEffect(() => {
    const closeMenu = () => {
      setIsOpen(false);
    };
    if (isOpen) {
      document.addEventListener("click", closeMenu);
    }
    return () => {
      document.removeEventListener("click", closeMenu);
    };
  }, [isOpen]);

  return [isOpen, setIsOpen];
}
