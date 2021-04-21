import { useDispatch, useSelector } from "react-redux";
import { Anchor } from "zdog";
import CheckBox from "../CheckBox";
import InputText from "../InputText";
import styles from "./style.module.css";
// import table from "../../styles/table.module.css";
import { Table, TableRow } from "../../ui/Table/Table";

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
      <Table name="Canvas">
        <TableRow label="Rotation">
          {["x", "y", "z"].map(axis => (
            <InputText
              callback={handleRotate}
              slicePath={["illo", "rotate", axis]}
              label={axis.toUpperCase()}
              key={axis}
            />
          ))}
        </TableRow>
        <TableRow label="Zoom">
          <InputText callback={handleZoom} slicePath={["illo", "zoom"]} />
        </TableRow>
      </Table>
      <Table name="Settings">
        <TableRow label="Drag to rotate">
          <CheckBox
            callback={toggleDragRotate}
            slicePath={["illo", "dragRotate"]}
          />
        </TableRow>
        <TableRow label="Centered">
          <CheckBox
            callback={toggleCentered}
            slicePath={["illo", "centered"]}
          />
        </TableRow>
      </Table>
    </div>
  );
}
