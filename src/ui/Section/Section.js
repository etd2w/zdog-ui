import styles from "./section.module.css";

export default function Section({ title, header, children, className }) {
  return (
    <section className={`stack ${styles.section} ${className}`}>
      <header>
        <div>{title}</div>
        <div>{header}</div>
      </header>
      <article className="box-small">
        <div className="stack">{children}</div>
      </article>
    </section>
  );
}
