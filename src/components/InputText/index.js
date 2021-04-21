import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./style.module.css";

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
    let startCoordinate = event.clientX;

    const handleMouseMove = event => {
      const currentCoordinate = event.clientX;

      setValue(value + currentCoordinate - startCoordinate);
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
    <label className={`${styles.inputText}`}>
      {label && <span onMouseDown={handleLabelMouseDown}>{label}</span>}
      <div>
        <input
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
