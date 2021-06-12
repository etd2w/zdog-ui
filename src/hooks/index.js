import { useEffect, useState } from "react";

export function useContextMenu() {
  const [isOpen, setIsOpen] = useState(false);

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
