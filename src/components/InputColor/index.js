import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./style.module.css";

export default function InputColor({ callback, options }) {
  const state = useSelector(state => {
    const { object, property } = options;

    if (typeof object !== "string") {
      return state[object[0]][object[1]][property];
    }
    return state[object][property];
  });

  const [value, setValue] = useState(state);
  const id = Math.random();
  const colorPicker = useRef(null);

  useEffect(() => {
    setValue(state);
  }, [state]);

  const handleChange = ({ target }) => {
    setValue(target.value);
    callback(target.value, options);
    colorPicker.current.style.fill = target.value;
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
          <path ref={colorPicker} d="M10.5.5H.5v10h10V.5z" fill={value} />
        </svg>
      </label>

      <input type="text" value={value} onChange={handleChange} />
    </div>
  );
}
