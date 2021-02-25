import { useDispatch, useSelector } from "react-redux";
import { Anchor } from "zdog";
import CheckBox from "../CheckBox";
import InputText from "../InputText";
import styles from "./style.module.css";

export default function CanvasSettings() {
  const illo = useSelector(state => state.illo);
  const dispatch = useDispatch();

  const handleReset = () => {
    illo.illustration.rotate.set({});
    dispatch({ type: "CHANGE_ILLO" });
  };

  const handleToggleCentered = () => {
    illo.illustration.centered = !illo.centered;
  };

  const handleToggleDragRotate = () => {
    if (illo.illustration.dragRotate === illo) {
      illo.illustration.dragRotate = new Anchor({});
    } else {
      illo.illustration.dragRotate = illo;
    }
  };

  const handleRotate = (value, options) => {
    illo.illustration.rotate[options.axis] = (value * Math.PI) / 180;
  };

  const handleZoom = value => {
    illo.illustration.zoom = value;
  };

  return (
    <div className={styles.canvasSettings}>
      <div className={styles.table}>
        <div className={styles.tableHead}>
          <span>Rotation</span>
          <button onClick={handleReset}>reset</button>
        </div>

        <div className={styles.tableBody}>
          <div className={styles.tableRow}>
            <span>Rotate X</span>
            <InputText
              initValue={Math.round(
                illo.illustration.rotate.x / (Math.PI / 180)
              )}
              callback={handleRotate}
              options={{ element: "illo", axis: "x" }}
            />
          </div>
          <div className={styles.tableRow}>
            <span>Rotate Y</span>
            <InputText
              initValue={Math.round(
                illo.illustration.rotate.y / (Math.PI / 180)
              )}
              callback={handleRotate}
              options={{ element: "illo", axis: "y" }}
            />
          </div>
          <div className={styles.tableRow}>
            <span>Rotate Z</span>
            <InputText
              initValue={Math.round(
                illo.illustration.rotate.z / (Math.PI / 180)
              )}
              callback={handleRotate}
              options={{ element: "illo", axis: "z" }}
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
              initValue={illo.illustration.dragRotate}
              callback={handleToggleDragRotate}
            />
          </div>
          <div className={styles.tableRow}>
            <span>Centered</span>
            <CheckBox
              initValue={illo.illustration.centered}
              callback={handleToggleCentered}
            />
          </div>
        </div>
      </div>

      <div className={styles.table}>
        <div className={styles.tableHead}>
          <span>Canvas</span>
        </div>

        <div className={styles.tableBody}>
          <div className={styles.tableRow}>
            <span>Zoom</span>
            <InputText
              initValue={illo.illustration.zoom}
              callback={handleZoom}
              options={{ element: "illo" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
