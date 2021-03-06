import { useState } from "react";
import { RgbaStringColorPicker } from "react-colorful";
import styles from "./style.module.css";

export default function ColorPicker({ onChange, newColor }) {
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const [color, setColor] = useState("rgba(169, 207, 84, 1)");

  const handleChange = color => {
    setColor(color);
    onChange(color);
  };

  return (
    <div>
      <button
        className={styles.swatch}
        style={{ backgroundColor: newColor }}
        onClick={() => setIsColorPickerOpen(!isColorPickerOpen)}
        onBlur={() => setIsColorPickerOpen(false)}
      />
      {isColorPickerOpen && (
        <section className={styles.customPicker}>
          <RgbaStringColorPicker color={color} onChange={handleChange} />
        </section>
      )}
    </div>
  );
}
