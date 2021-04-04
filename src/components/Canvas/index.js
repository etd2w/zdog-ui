import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Illustration } from "zdog";
import CanvasSettings from "./CanvasSettings";
import styles from "./style.module.css";
import section from "../../styles/section.module.css";

export default function Canvas() {
  const dispatch = useDispatch();
  const illo = useSelector(state => state.illo);
  const canvasRef = useRef();

  useEffect(() => {
    dispatch({
      type: "CREATE_ILLO",
      payload: new Illustration({
        element: ".canvas",
        dragRotate: true,
        resize: true,
        onDragMove: () => {
          dispatch({ type: "CHANGE_ILLO" });
        },
      }),
    });
  }, [dispatch]);

  useEffect(() => {
    console.log(canvasRef.current.getBoundingClientRect());
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
    <section className={section.canvas}>
      <header className={section.header}>Canvas</header>

      <article className={section.article}>
        <div className={styles.container} ref={canvasRef}>
          <canvas className="canvas" />
        </div>

        {illo && <CanvasSettings />}
      </article>
    </section>
  );
}
