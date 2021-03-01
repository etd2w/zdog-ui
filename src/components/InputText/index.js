import { useEffect, useState } from "react";
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

  const [value, setValue] = useState(state);

  useEffect(() => {
    setValue(state);
  }, [state]);

  const handleBlur = ({ target }) => {
    callback(target.value, options);
  };

  const handleChange = ({ target }) => {
    setValue(target.value);
  };

  return (
    <label>
      <input
        className={styles.input}
        type="text"
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </label>
  );
}
