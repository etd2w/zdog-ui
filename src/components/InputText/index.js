import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./style.module.css";

export default function InputText({ callback, options }) {
  const state = useSelector(state => {
    const { object, property } = options;

    if (typeof object !== "string") {
      return state[object[0]][object[1]][property];
    }
    return state[object][property];
  });

  const [value, setValue] = useState(() => {
    if (options.validate) {
      return options.validate(state);
    } else return state;
  });
  const inputRef = useRef();

  useEffect(() => {
    if (options.validate) {
      setValue(options.validate(state));
    } else {
      setValue(state);
    }
  }, [options, options.validate, state]);

  const handleBlur = ({ target }) => {
    callback(target.value, options);
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
      callback(inputRef.current.value, options);
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
    <label className={styles.input}>
      <span className={styles.input__label} onMouseDown={handleLabelMouseDown}>
        {options.label}
      </span>
      <input
        className={styles.input__field}
        ref={inputRef}
        type="text"
        value={value}
        onClick={({ target }) => target.select()}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </label>
  );
}
