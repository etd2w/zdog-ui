import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./style.module.css";

export default function InputText({ initValue, callback, axis }) {
  const [value, setValue] = useState(initValue);
  const illo = useSelector(state => state.illo); // Temporary

  useEffect(() => {
    if (illo.illustration.rotate) {
      setValue(Math.round(illo.illustration.rotate[axis] / (Math.PI / 180)));
    }
  }, [axis, illo]);

  const hanldeChange = ({ target }) => {
    setValue(target.value);
    callback(axis, target.value);
  };

  return (
    <input
      className={styles.input}
      type="text"
      value={value}
      onChange={hanldeChange}
    />
  );
}
