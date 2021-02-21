import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Anchor, Illustration } from "zdog";
import CheckBox from "../CheckBox";
import InputText from "../InputText";
import styles from "./style.module.css";

export default function Canvas() {
  const dispatch = useDispatch();
  const illo = useSelector(state => state.illo.illustration);

  useEffect(() => {
    dispatch({
      type: "CREATE_ILLO",
      payload: new Illustration({
        element: ".canvas",
        dragRotate: true,
        onDragMove: () => {
          dispatch({ type: "ROTATE_ILLO" });
        },
      }),
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

  const handleInputRotate = (axis, value) => {
    illo.rotate[axis] = (value * Math.PI) / 180;
  };

  const handleResetRotate = () => {
    illo.rotate.set({});
    dispatch({ type: "ROTATE_ILLO" });
  };

  const handleToggleCentered = () => {
    illo.centered = !illo.centered;
  };

  const handleToggleDragRotate = () => {
    if (illo.dragRotate === illo) {
      illo.dragRotate = new Anchor({});
    } else {
      illo.dragRotate = illo;
    }
  };

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
                <button onClick={handleResetRotate}>reset</button>
              </div>

              <div className={styles.tableBody}>
                <div className={styles.tableRow}>
                  <span>Rotate X</span>
                  <InputText
                    initValue={illo.rotate.x}
                    callback={handleInputRotate}
                    axis="x"
                  />
                </div>
                <div className={styles.tableRow}>
                  <span>Rotate Y</span>
                  <InputText
                    initValue={illo.rotate.y}
                    callback={handleInputRotate}
                    axis="y"
                  />
                </div>
                <div className={styles.tableRow}>
                  <span>Rotate Z</span>
                  <InputText
                    initValue={illo.rotate.z}
                    callback={handleInputRotate}
                    axis="z"
                  />
                </div>
              </div>
            </div>

            <div className={styles.table}>
              <div className={styles.tableHead}>
                <span>Settings</span>
              </div>

              <div className={styles.tableBody}>
                <div className={styles.tableRow}>
                  <span>Drag to rotate</span>
                  <CheckBox
                    initValue={illo.dragRotate}
                    callback={handleToggleDragRotate}
                  />
                </div>
                <div className={styles.tableRow}>
                  <span>Centered</span>
                  <CheckBox
                    initValue={illo.centered}
                    callback={handleToggleCentered}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
