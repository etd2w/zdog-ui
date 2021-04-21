import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Illustration } from "zdog";
import CanvasSettings from "./CanvasSettings";
import styles from "./style.module.css";
import Section from "../../ui/Section/Section";

export default function Canvas() {
  const dispatch = useDispatch();
  const illo = useSelector(state => state.illo);
  const canvasRef = useRef();

  useEffect(() => {
    dispatch({
      type: "ILLO_CREATED",
      payload: new Illustration({
        element: ".canvas",
        dragRotate: true,
        // resize: true,
        onDragMove: () => {
          dispatch({ type: "ILLO_CHANGED" });
        },
      }),
    });
  }, [dispatch]);

  useEffect(() => {
    if (illo) {
      illo.setSize(
        canvasRef.current.getBoundingClientRect().width,
        canvasRef.current.getBoundingClientRect().height
      );
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
      <div className={styles.container} ref={canvasRef}>
        <canvas className="canvas" />
        {illo && <CanvasSettings />}
      </div>
    </Section>

    // <section className="stack">
    //   <header className={section.header}>Canvas</header>

    //   <article className={section.article}>
    // <div className={styles.container} ref={canvasRef}>
    //   <canvas className="canvas" />
    // </div>

    //   </article>
    // </section>
  );
}
