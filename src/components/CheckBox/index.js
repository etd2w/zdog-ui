import { useState } from "react";
import { useSelector } from "react-redux";
import styles from "./style.module.css";

export default function CheckBox({ callback, options }) {
  const state = useSelector(state => state[options.object][options.property]);
  const [checked, setChecked] = useState(Boolean(state));
  const label = Math.random();

  const handleChange = () => {
    setChecked(!checked);
    callback(options);
  };

  return (
    <label htmlFor={label} className={styles.checkbox}>
      <input
        type="checkbox"
        id={label}
        checked={checked}
        onChange={handleChange}
      />

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
