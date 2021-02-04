import { useEffect, useRef } from "react";
import styles from "./style.module.css";

export default function ContextMenu({ children }) {
  const menuRef = useRef(null);

  const handleContextMenu = event => {
    event.preventDefault();
    console.log("test");
    menuRef.current.style.transform = `translate(${event.pageX}px, ${event.pageY}px)`;
    menuRef.current.style.display = "block";
  };

  useEffect(() => {
    document.addEventListener("contextmenu", handleContextMenu);
  }, []);

  return (
    <div ref={menuRef} className={styles.contextMenu}>
      {children}
    </div>
  );
}
