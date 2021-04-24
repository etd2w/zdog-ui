import styles from "./contextMenu.module.css";

export function ContextMenu({ children }) {
  return <div className={`${styles.contextMenu}`}>{children}</div>;
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
