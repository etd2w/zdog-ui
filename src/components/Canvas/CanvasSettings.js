import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Anchor } from "zdog";
import CheckBox from "../CheckBox";
import ColorPicker from "../ColorPicker";
import InputColor from "../InputColor";
import InputText, { Label } from "../InputText";
import styles from "./style.module.css";

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

  const handleColor = color => {
    const canvas = document.getElementById("canv");
    canvas.style.backgroundColor = color;
  };

  return (
    <div className={styles.settings}>
      <table>
        <thead>
          <tr>
            <th scope="col">Canvas</th>
            <th scope="col">
              <button onClick={resetRotation}>
                <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M8.01 3a4.983 4.983 0 013.444 1.385l.72-.72a.484.484 0 01.826.342V6.71a.484.484 0 01-.484.484H9.813a.484.484 0 01-.342-.826l.842-.842a3.388 3.388 0 10-.083 5.024.242.242 0 01.33.01l.8.8a.242.242 0 01-.01.351A5 5 0 013 8a5.009 5.009 0 015.01-5z"
                    fill="currentColor"
                  />
                </svg>
                reset
              </button>
            </th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Rotation</td>
            <td>
              {["x", "y", "z"].map(axis => (
                <Fragment key={axis}>
                  <Label
                    id={`rotateCanvas${axis}`}
                    slicePath={["illo", "rotate", axis]}
                  >
                    {axis.toUpperCase()}
                  </Label>
                  <InputText
                    callback={handleRotate}
                    slicePath={["illo", "rotate", axis]}
                    id={`rotateCanvas${axis}`}
                  />
                </Fragment>
              ))}
            </td>
          </tr>
          <tr>
            <td>Zoom</td>
            <td>
              <InputText callback={handleZoom} slicePath={["illo", "zoom"]} />
            </td>
          </tr>

          <tr>
            <td>Color</td>
            <td>
              <InputColor
                callback={handleColor}
                node={document.getElementById("canv")}
              />
            </td>
          </tr>
        </tbody>
      </table>

      <table>
        <thead>
          <tr>
            <th scope="col">Settings</th>
            <th scope="col">
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Drag to rotate</td>
            <td>
              <CheckBox
                callback={toggleDragRotate}
                slicePath={["illo", "dragRotate"]}
              />
            </td>
          </tr>
          <tr>
            <td>Centered</td>
            <td>
              <CheckBox
                callback={toggleCentered}
                slicePath={["illo", "centered"]}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
