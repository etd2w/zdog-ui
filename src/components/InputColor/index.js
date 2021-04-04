import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./style.module.css";

export default function InputColor({ callback, slicePath, label }) {
  // Select a piece of state that the input gonna subscribe to
  const selectSlice = useSelector(state => {
    let slice = state;

    slicePath.forEach(property => {
      slice = slice[property];
    });

    return slice;
  });
  // State of the input field
  const [value, setValue] = useState("#a9cf54");
  // Ref of the colorPicker
  const colorPicker = useRef();
  // If the selected slice changes outside of the input field we should sinc the input
  useEffect(() => {
    setValue(selectSlice);
  }, [selectSlice]);

  const id = Math.random();

  const handleChange = ({ target }) => {
    setValue(target.value);
    callback(
      target.value,
      slicePath[slicePath.length - 1],
      slicePath[slicePath.length - 2]
    );
    colorPicker.current.style.fill = target.value;
  };

  return (
    <div className={styles.inputColor}>
      <span>{label}</span>
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
          <path
            ref={colorPicker}
            d="M10.5.5H.5v10h10V.5z"
            fill={value.toString()}
          />
        </svg>
      </label>

      <input type="text" value={value} onChange={handleChange} />
    </div>
  );
}
