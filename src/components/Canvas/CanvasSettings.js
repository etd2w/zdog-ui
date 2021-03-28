import { useDispatch, useSelector } from "react-redux";
import { Anchor } from "zdog";
import CheckBox from "../CheckBox";
import InputText from "../InputText";
import styles from "./style.module.css";

export default function CanvasSettings() {
  const illo = useSelector(state => state.illo);
  const dispatch = useDispatch();

  const resetRotation = () => {
    illo.rotate.set({});
    dispatch({ type: "CHANGE_ILLO" });
  };

  const handleRotate = (value, property) => {
    illo.rotate[property] = (value * Math.PI) / 180;
  };

  const toggleCentered = () => {
    illo.centered = !illo.centered;
  };

  const toggleDragRotate = () => {
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
          <button onClick={resetRotation}>reset</button>
        </div>

        <div className={styles.tableBody}>
          {["x", "y", "z"].map(axis => (
            <div className={styles.tableRow} key={axis}>
              <InputText
                callback={handleRotate}
                slicePath={["illo", "rotate", axis]}
                label={`Rotate ${axis.toUpperCase()}`}
              />
            </div>
          ))}
        </div>
      </div>

      <div className={styles.table}>
        <div className={styles.tableHead}>
          <span>Settings</span>
        </div>

        <div className={styles.tableBody}>
          <div className={styles.tableRow}>
            <CheckBox
              callback={toggleDragRotate}
              slicePath={["illo", "dragRotate"]}
              label="Drag to rotate"
            />
          </div>
          <div className={styles.tableRow}>
            <CheckBox
              callback={toggleCentered}
              slicePath={["illo", "centered"]}
              label="Centered"
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
            <InputText
              callback={handleZoom}
              slicePath={["illo", "zoom"]}
              label="Zoom"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
