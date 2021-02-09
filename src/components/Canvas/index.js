import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Illustration } from "zdog";
import styles from "./style.module.css";

export default function Canvas() {
  const dispatch = useDispatch();
  const illo = useSelector(state => state.illo);

  useEffect(() => {
    dispatch({
      type: "CREATE_ILLO",
      payload: new Illustration({ element: ".canvas", dragRotate: true }),
    });
  }, [dispatch]);

  useEffect(() => {
    if (illo.updateRenderGraph) {
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
    <div>
      <div className={styles.header}>
        <span className={styles.title}>Canvas</span>
      </div>

      <div className={styles.contentBlock}>
        <canvas className="canvas" height={417} width={568} />
      </div>
    </div>
  );
}
