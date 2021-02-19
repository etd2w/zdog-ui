import { useState } from "react";
import styles from "./style.module.css";

export default function InputColor({ initValue, callback }) {
  const [value, setValue] = useState(initValue);
  const id = Math.random();

  const handleChange = ({ target }) => {
    setValue(target.value);
    callback(target.value);
  };

  return (
    <div className={styles.inputColor}>
      <label htmlFor={id}>
        <input id={id} type="color" value={value} onChange={handleChange} />
        <svg
          width="11"
          height="11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.75 10.75H.25V.25h10.5v10.5z"
            stroke="#fff"
            strokeOpacity=".6"
            strokeWidth=".5"
          />
          <path d="M10.5.5H.5v10h10V.5z" fill="#353F49" />
        </svg>
      </label>

      <input type="text" value={value} onChange={handleChange} />
    </div>
  );
}
