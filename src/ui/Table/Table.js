import styles from "./table.module.css";

export function Table({ children, name }) {
  return (
    <table>
      <thead>
        <tr className={styles.tableHeadRow}>
          <th scope="col">{name}</th>
          <th scope="col">
            <span className="sr-only">Edit</span>
          </th>
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
}

export function TableRow({ children, label }) {
  return (
    <tr className={styles.tableDataRow}>
      <td>{label}</td>
      <td>{children}</td>
    </tr>
  );
}
