import { useEffect, useState } from "react";
import styles from "./checkBox.module.css";

export default function CheckBoxUI({ state, onChange }) {
  const [value, setValue] = useState(true);

  useEffect(() => {
    setValue(Boolean(state));
  }, [state, value]);

  const handleChange = () => {
    setValue(!value);
    onChange();
  };

  return (
    <label className={styles.checkbox}>
      <input type="checkbox" checked={value} onChange={handleChange} />

      <svg
        width="11"
        height="11"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className={styles.checkbox__bg}
          d="M10.5 10.5H.5V.5h10v10z"
          stroke="#fff"
          strokeOpacity=".6"
        />
        <path
          className={styles.checkbox__checkmark}
          d="M9 2H2v7h7V2z"
          fill="transparent"
          fillOpacity=".6"
        />
      </svg>
    </label>
  );
}
