import { useState } from "react";
import { RgbaStringColorPicker } from "react-colorful";
import styles from "./style.module.css";

export default function ColorPicker({ onChange, newColor }) {
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);

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
          <RgbaStringColorPicker
            color="rgba(169, 207, 84, 1)"
            onChange={onChange}
          />
        </section>
      )}
    </div>
  );
}
