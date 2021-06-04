import { useEffect } from "react";
import createCanvas from "../utils";

export default function Explore() {
  useEffect(() => {
    if (localStorage.length !== 0) {
      Object.keys(localStorage).forEach(model => {
        createCanvas(`canvas[data-uuid='${model}']`, {}, model);
      });
    }
  }, []);

  return Object.keys(localStorage).map(model => (
    <canvas
      style={{ backgroundColor: "#121212", marginRight: "6px" }}
      key={model}
      data-uuid={model}
    />
  ));
}
