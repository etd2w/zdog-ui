import { useDispatch, useSelector } from "react-redux";
import { Anchor } from "zdog";
import CheckBox from "../CheckBox";
import InputText from "../InputText";
import styles from "./style.module.css";
import table from "../../styles/table.module.css";

export default function CanvasSettings() {
  const illo = useSelector(state => state.illo);
  const dispatch = useDispatch();

  const resetRotation = () => {
    illo.rotate.set({});
    dispatch({ type: "ILLO_CHANGED" });
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
    <div className={styles.settings}>
      <table className={table.table}>
        <thead className={table.thead}>
          <tr>
            <th className={table.th}>
              <span>Canvas</span>
              <button onClick={resetRotation}>reset rotation</button>
            </th>
          </tr>
        </thead>
        <tbody className={table.tbody}>
          <tr className={table.tr}>
            <td className={table.td}>
              <span>Rotation</span>
              {["x", "y", "z"].map(axis => (
                <InputText
                  callback={handleRotate}
                  slicePath={["illo", "rotate", axis]}
                  label={axis.toUpperCase()}
                  key={axis}
                />
              ))}
            </td>
          </tr>
          <tr className={table.tr}>
            <td className={table.td}>
              <InputText
                callback={handleZoom}
                slicePath={["illo", "zoom"]}
                label="Zoom"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <table className={table.table}>
        <thead className={table.thead}>
          <tr>
            <th className={table.th}>Settings</th>
          </tr>
        </thead>
        <tbody className={table.tbody}>
          <tr className={table.tr}>
            <td className={table.td}>
              <CheckBox
                callback={toggleDragRotate}
                slicePath={["illo", "dragRotate"]}
                label="Drag to rotate"
              />
            </td>
          </tr>
          <tr className={table.tr}>
            <td className={table.td}>
              <CheckBox
                callback={toggleCentered}
                slicePath={["illo", "centered"]}
                label="Centered"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
