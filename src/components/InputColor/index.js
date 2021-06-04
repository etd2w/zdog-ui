import { useState } from "react";
import { useSelector } from "react-redux";
import { rgbToHex } from "../../utils";
import CheckBoxUI from "../../ui/CheckBox/CheckBox";
import ColorPicker from "../ColorPicker";
import styles from "./style.module.css";

export default function InputColor({ callback, slicePath, checkbox, node }) {
  const selectIllo = useSelector(state => state.illo);
  const selectSlice = useSelector(state => {
    let slice = state;

    if (slicePath) {
      slicePath.forEach(property => {
        slice = slice[property];
      });

      return slice;
    } else return "#333333";
  });

  const [stateOfTheInput, setStateOfTheInput] = useState(selectSlice);

  const handleCheckbox = () => {
    setStateOfTheInput(!Boolean(stateOfTheInput));
    callback(
      !Boolean(stateOfTheInput),
      slicePath[slicePath.length - 1],
      slicePath[slicePath.length - 2]
    );
  };

  const handlePicker = color => {
    const hex = rgbToHex(color);

    setStateOfTheInput(hex);

    if (slicePath) {
      callback(
        hex,
        slicePath[slicePath.length - 1],
        slicePath[slicePath.length - 2]
      );
    } else {
      callback(hex);
    }
  };

  const handleInput = ({ target }) => {
    setStateOfTheInput(target.value);
    localStorage.setItem(`{selectIllo.id}`, JSON.stringify(selectIllo));

    if (slicePath) {
      callback(
        target.value,
        slicePath[slicePath.length - 1],
        slicePath[slicePath.length - 2]
      );
    } else {
      callback(target.value);
    }
  };

  return (
    <div className={styles.colorPicker}>
      {checkbox && (
        <div>
          <CheckBoxUI
            state={Boolean(stateOfTheInput)}
            onChange={handleCheckbox}
          />
        </div>
      )}
      <ColorPicker onChange={handlePicker} newColor={selectSlice} />
      {slicePath ? (
        <input type="text" value={selectSlice} onChange={handleInput} />
      ) : (
        <input
          type="text"
          value={rgbToHex(selectSlice)}
          onChange={handleInput}
        />
      )}
    </div>
  );
}
