import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputText from "../InputText";
import styles from "./style.module.css";

export default function Canvas() {
  const dispatch = useDispatch();
  const illo = useSelector(state => state.illo);

  useEffect(() => {
    dispatch({ type: "CREATE_ILLO" });
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

        {illo.children && (
          <div className={styles.canvasSettings}>
            <div className={styles.table}>
              <div className={styles.tableHead}>
                <span>Rotation</span>
                <button>reset</button>
              </div>

              <div className={styles.tableBody}>
                <div className={styles.tableRow}>
                  <span>Rotate X</span>
                  <InputText initValue={illo.rotate.x} />
                </div>
                <div className={styles.tableRow}>
                  <span>Rotate Y</span>
                  <InputText initValue={illo.rotate.y} />
                </div>
                <div className={styles.tableRow}>
                  <span>Rotate Z</span>
                  <InputText initValue={illo.rotate.z} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
