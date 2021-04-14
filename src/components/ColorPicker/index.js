import { useEffect, useState } from "react";
import { RgbaStringColorPicker } from "react-colorful";
import { hexToRgb } from "../../utils";
import styles from "./style.module.css";

export default function ColorPicker({ onChange, newColor }) {
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const [color, setColor] = useState("rgba(169,207,84,1)");

  useEffect(() => {
    if (typeof newColor === "string") {
      setColor(hexToRgb(newColor));
    }
  }, [newColor]);

  const handleChange = color => {
    setColor(color);
    onChange(color);
  };

  return (
    <div>
      <button
        style={{ backgroundColor: color }}
        onClick={() => setIsColorPickerOpen(!isColorPickerOpen)}
        className={styles.swatch}
        onBlur={() => setIsColorPickerOpen(false)}
      />
      {isColorPickerOpen && (
        <section className="custom-picker">
          <RgbaStringColorPicker color={color} onChange={handleChange} />
        </section>
      )}
    </div>
  );
}
