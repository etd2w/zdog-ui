import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Illustration } from "zdog";
import CanvasSettings from "./CanvasSettings";
import styles from "./style.module.css";
import Section from "../../ui/Section/Section";

export default function Canvas() {
  const dispatch = useDispatch();
  const illo = useSelector(state => state.illo);

  useEffect(() => {
    dispatch({
      type: "ILLO_CREATED",
      payload: new Illustration({
        element: ".canvas",
        dragRotate: true,
        centered: true,
        onDragMove: () => {
          dispatch({ type: "ILLO_CHANGED" });
        },
      }),
    });
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
        <canvas className="canvas" />
      </div>
      {illo && <CanvasSettings />}
    </Section>
  );
}
