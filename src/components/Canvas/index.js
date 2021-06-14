import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CanvasSettings from "./CanvasSettings";
import styles from "./style.module.css";
import Section from "../../ui/Section/Section";
import { createCanvas } from "../../utils";
import Toolbar from "../Toolbar";

// async function readText(event) {
//   const Zdog = zdog;

//   const file = event.target.files[0];
//   const text = await file.text();
//   console.log(eval(text));
// }

export default function Canvas() {
  const dispatch = useDispatch();
  const illo = useSelector(state => state.illo);

  useEffect(() => {
    const defaultSettings = {
      onDragMove: () => {
        dispatch({ type: "ILLO_CHANGED" });
      },
    };

    const newIllo =
      localStorage.length !== 0
        ? createCanvas(".canvas", defaultSettings, Object.keys(localStorage)[0])
        : createCanvas(".canvas", defaultSettings);

    dispatch({
      type: "ILLO_CREATED",
      payload: newIllo,
    });
  }, [dispatch]);

  useEffect(() => {
    if (illo) {
      const width = illo.element.parentNode.getBoundingClientRect().width;
      const height = illo.element.parentNode.getBoundingClientRect().height - 9;
      illo.setSizeCanvas(width, height);
    }
  });

  return (
    <Section title="Canvas">
      <Toolbar />

      <div className={styles.container}>
        <canvas className="illo canvas" id="canv" />
      </div>
      {illo && <CanvasSettings />}
    </Section>
  );
}
