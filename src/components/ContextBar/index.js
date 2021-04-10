import styles from "./style.module.css";

export default function ContextBar({ children }) {
  return <div className={styles.shapeBar}>{children}</div>;
}
