import { useEffect, useState } from "react";
import { RgbaStringColorPicker } from "react-colorful";
import { useSelector } from "react-redux";
import { hexToRgb, rgbToHex } from "../../utils/";
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
  const [colorRGB, setColorRGB] = useState("rgba(169,207,84,1)");
  const [colorHEX, setColorHEX] = useState(selectSlice);
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);

  useEffect(() => {
    setColorHEX(selectSlice);
  }, [selectSlice]);

  const handleInputColor = ({ target }) => {
    setColorHEX(target.value);
    setColorRGB(hexToRgb(target.value));
    callback(
      target.value,
      slicePath[slicePath.length - 1],
      slicePath[slicePath.length - 2]
    );
  };

  const handlePicker = color => {
    const hex = rgbToHex(color);

    setColorHEX(hex);
    setColorRGB(color);
    callback(
      hex,
      slicePath[slicePath.length - 1],
      slicePath[slicePath.length - 2]
    );
  };

  return (
    <div className={styles.colorPicker}>
      <div>{label}</div>
      <div>
        <button
          style={{ backgroundColor: selectSlice }}
          onClick={() => setIsColorPickerOpen(!isColorPickerOpen)}
          className={styles.swatch}
          onBlur={() => setIsColorPickerOpen(false)}
        />
        {isColorPickerOpen && (
          <section className="custom-picker">
            <RgbaStringColorPicker color={colorRGB} onChange={handlePicker} />
          </section>
        )}
      </div>
      <div className={styles.flexChild}>
        <input
          type="text"
          value={colorHEX}
          onChange={handleInputColor}
          maxLength="9"
        />
      </div>
    </div>
  );
}
