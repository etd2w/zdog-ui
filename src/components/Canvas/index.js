import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CanvasSettings from "./CanvasSettings";
import styles from "./style.module.css";
import Section from "../../ui/Section/Section";
import createCanvas from "../../utils";

export default function Canvas() {
  const dispatch = useDispatch();
  const illo = useSelector(state => state.illo);

  useEffect(() => {
    if (localStorage.length !== 0) {
      const lastEditedLocalModel = Object.keys(localStorage)[0];

      const illoSettings = {
        onDragMove: () => {
          dispatch({ type: "ILLO_CHANGED" });
        },
      };

      const illo = createCanvas(".canvas", illoSettings, lastEditedLocalModel);

      dispatch({
        type: "ILLO_CREATED",
        payload: illo,
      });
    } else {
      const illo = createCanvas(".canvas", {});

      dispatch({
        type: "ILLO_CREATED",
        payload: illo,
      });
    }
  }, [dispatch]);

  useEffect(() => {
    if (illo) {
      const width = illo.element.parentNode.getBoundingClientRect().width;
      const height = illo.element.parentNode.getBoundingClientRect().height - 9;
      illo.setSizeCanvas(width, height);

      let requestId;
      const animate = () => {
        illo.updateRenderGraph();
        requestId = requestAnimationFrame(animate);
      };

      animate();

      return () => {
        cancelAnimationFrame(requestId);
      };
    }
  });

  return (
    <Section title="Canvas">
      <div className={styles.container}>
        <canvas className="canvas" id="canv" />
      </div>
      {illo && <CanvasSettings />}
    </Section>
  );
}
