import { useEffect, useState } from "react";
import styles from "./style.module.css";

export default function InputText({ initValue, callback, options }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    setValue(initValue);
  }, [initValue]);

  const handleChange = ({ target }) => {
    setValue(target.value);
    callback(target.value, options);
  };

  return (
    <label>
      <input
        className={styles.input}
        type="text"
        value={value}
        onChange={handleChange}
      />
    </label>
  );
}
