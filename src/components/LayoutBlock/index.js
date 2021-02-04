import styles from "./style.module.css";

export default function LayoutBlock({ title, children }) {
  return (
    <div>
      <div className={styles.header}>
        <span className={styles.title}>{title}</span>
        <button className={styles.button}>
          <svg
            width="11"
            height="11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="11" height="11" rx="2" fill="#fff" />
            <path fill="#1C242D" d="M5 2h1v7H5z" />
            <path fill="#1C242D" d="M2 5h7v1H2z" />
          </svg>
          <div className={styles.padLeft}>Add</div>
        </button>
      </div>

      <div className={styles.contentBlock}>{children}</div>
    </div>
  );
}
