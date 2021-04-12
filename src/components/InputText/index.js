import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./style.module.css";
import utils from "../../styles/utils.module.css";

export default function InputText({ callback, slicePath, label }) {
  // Select a piece of state that the input gonna subscribe to
  const selectSlice = useSelector(state => {
    let slice = state;

    slicePath.forEach(property => {
      slice = slice[property];
    });

    return slice;
  });
  // State of the input field
  const [value, setValue] = useState(() => {
    if (typeof selectSlice !== "number") return;

    if (slicePath[slicePath.length - 2] === "rotate") {
      return Math.round(selectSlice * (180 / Math.PI));
    } else return selectSlice;
  });
  // Ref of the input
  const inputRef = useRef();
  // If the selected slice changes outside of the input field we should sinc the input
  useEffect(() => {
    if (typeof selectSlice !== "number") return;

    if (slicePath[slicePath.length - 2] === "rotate") {
      setValue(Math.round(selectSlice * (180 / Math.PI)));
    } else {
      setValue(selectSlice);
    }
  }, [selectSlice, slicePath]);
  // apply the change to the selected slice
  const applyChange = ({ target }) => {
    const vector = slicePath[slicePath.length - 2];
    const property = slicePath[slicePath.length - 1];
    if (slicePath[1] === "path") {
      callback(parseFloat(target.value), slicePath);
    } else {
      callback(parseFloat(target.value), property, vector);
    }
  };

  const handleChange = ({ target }) => {
    setValue(target.value);
  };

  const handleLabelMouseDown = event => {
    let lastPos = event.pageX;

    const handleMouseMove = event => {
      if (event.pageX < lastPos) {
        setValue(value => parseInt(value) - 1);
      } else {
        setValue(value => parseInt(value) + 1);
      }
      lastPos = event.pageX;
      if (slicePath[1] === "path") {
        callback(parseFloat(inputRef.current.value), slicePath);
      } else {
        callback(
          parseFloat(inputRef.current.value),
          slicePath[slicePath.length - 1],
          slicePath[slicePath.length - 2]
        );
      }
    };

    document.documentElement.style.cursor = "ew-resize";

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener(
      "mouseup",
      () => {
        document.documentElement.style.cursor = "default";
        inputRef.current.blur();
        window.removeEventListener("mousemove", handleMouseMove);
      },
      { once: true }
    );
  };

  return (
    <label className={`${utils.flex} ${styles.container}`}>
      <div className={styles.label} onMouseDown={handleLabelMouseDown}>
        {label}
      </div>
      <div className={utils.flex2}>
        <input
          className={styles.field}
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleChange}
          onClick={({ target }) => target.select()}
          onBlur={applyChange}
        />
      </div>
    </label>
  );
}
