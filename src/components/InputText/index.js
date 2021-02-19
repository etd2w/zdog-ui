import { useState } from "react";
import styles from "./style.module.css";

export default function InputText({ initValue, payload }) {
  const [value, setValue] = useState(initValue);

  const hanldeChange = ({ target }) => {
    setValue(target.value);
    payload.callback(payload.axis, target.value);
  };

  return (
    <input
      className={styles.input}
      type="text"
      value={value}
      onChange={hanldeChange}
    />
  );
}
