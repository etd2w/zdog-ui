import { useEffect, useRef, useState } from "react";
import styles from "./contextMenu.module.css";

export function ContextMenu({ children, parentRef, event = "contextmenu" }) {
  const [isOpen, setIsOpen] = useState(false);
  const [coords, setCoords] = useState(0);
  const menuRef = useRef(null);

  const handleContextMenu = event => {
    event.preventDefault();
    const box = parentRef.current.getBoundingClientRect();

    setIsOpen(!isOpen);
    setCoords(event.clientX - box.left);
  };

  const closeContextMenu = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const parent = parentRef.current;

    parent.addEventListener(`${event}`, handleContextMenu);
    document.addEventListener("click", closeContextMenu);
    return () => {
      parent.removeEventListener(`${event}`, handleContextMenu);
      document.removeEventListener("click", closeContextMenu);
    };
  });

  return isOpen ? (
    <div
      style={{ transform: `translate(${coords}px)` }}
      ref={menuRef}
      className="contextMenu"
    >
      {children}
    </div>
  ) : null;
}

export function ContextMenuItem({ children, onClick }) {
  return (
    <button
      className={styles.contextMenuItem}
      onClick={onClick}
      role="menuitem"
      tabIndex="-1"
    >
      {children}
    </button>
  );
}
