import { useEffect } from "react";
import createCanvas from "../utils";
import styles from "./explore.module.css";

export default function Explore() {
  useEffect(() => {
    if (localStorage.length !== 0) {
      Object.keys(localStorage).forEach(model => {
        createCanvas(`canvas[data-uuid='${model}']`, {}, model);
      });
    }
  }, []);

  return Object.keys(localStorage).map(model => (
    <canvas className={styles.canvas_example} key={model} data-uuid={model} />
  ));
}
