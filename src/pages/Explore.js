import { useEffect } from "react";
import { validate as uuidValidate } from "uuid";
import Navbar from "../components/Navbar";
import createCanvas from "../utils";
import styles from "./explore.module.css";

export default function Explore() {
  useEffect(() => {
    if (localStorage.length !== 0) {
      Object.keys(localStorage).forEach(model => {
        if (uuidValidate(model)) {
          createCanvas(`canvas[data-uuid='${model}']`, {}, model);
        }
      });
    }
  }, []);

  return (
    <>
      <Navbar />
      <div>
        {Object.keys(localStorage).map(model => (
          <canvas
            className={styles.canvas_example}
            key={model}
            data-uuid={model}
          />
        ))}
      </div>
    </>
  );
}
