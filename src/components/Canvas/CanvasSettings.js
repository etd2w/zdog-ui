import { useDispatch, useSelector } from "react-redux";
import { Anchor } from "zdog";
import CheckBox from "../CheckBox";
import InputText from "../InputText";
import styles from "./style.module.css";

export default function CanvasSettings() {
  const illo = useSelector(state => state.illo);
  const dispatch = useDispatch();

  const handleReset = () => {
    illo.rotate.set({});
    dispatch({ type: "CHANGE_ILLO" });
  };

  const handleRotate = (value, options) => {
    illo.rotate[options.property] = (value * Math.PI) / 180;
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

  const handleZoom = value => {
    illo.zoom = value;
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
              callback={handleRotate}
              options={{ object: ["illo", "rotate"], property: "x" }}
            />
          </div>
          <div className={styles.tableRow}>
            <span>Rotate Y</span>
            <InputText
              callback={handleRotate}
              options={{ object: ["illo", "rotate"], property: "y" }}
            />
          </div>
          <div className={styles.tableRow}>
            <span>Rotate Z</span>
            <InputText
              callback={handleRotate}
              options={{ object: ["illo", "rotate"], property: "z" }}
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
              callback={handleToggleDragRotate}
              options={{ object: "illo", property: "dragRotate" }}
            />
          </div>
          <div className={styles.tableRow}>
            <span>Centered</span>
            <CheckBox
              callback={handleToggleCentered}
              options={{ object: "illo", property: "centered" }}
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
              callback={handleZoom}
              options={{ object: "illo", property: "zoom" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
