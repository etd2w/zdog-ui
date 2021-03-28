import { useDispatch, useSelector } from "react-redux";
import { useContextMenu } from "../../hooks";
import InputText from "../InputText";
import PathBar from "../PathBar";
import styles from "./style.module.css";

export default function PathTable({ children }) {
  const [isContextMenuOpen, setIsContextMenuOpen] = useContextMenu(false);
  const shape = useSelector(state => state.shape);
  const path = useSelector(state => state.path);
  const dispatch = useDispatch();

  const changeProperty = (value, slicePath) => {
    if (slicePath[3] === "arc" || slicePath[3] === "bezier") {
      shape.path[slicePath[2]][slicePath[3]][slicePath[4]][
        slicePath[5]
      ] = parseFloat(value);
    } else {
      shape.path[slicePath[2]][slicePath[3]][slicePath[4]] = parseFloat(value);
    }
    shape.updatePath();
  };

  const removePath = id => {
    shape.path.splice(id, 1);
    dispatch({ type: "PATH_REMOVED", payload: shape });
    shape.updatePath();
  };

  return (
    <div>
      <div className={styles.tableHead}>
        <span>Path</span>
        {shape.type === "Shape" && (
          <button
            onClick={() => setIsContextMenuOpen(!isContextMenuOpen)}
            className={styles.button}
          >
            <svg
              width="11"
              height="11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="11" height="11" rx="2" fill="#fff" />
              <path fill="#1C242D" d="M5 2h1v7H5z" />
              <path fill="#1C242D" d="M2 5h7v1H2z" />
            </svg>
            <div className={styles.padLeft}>Add</div>
          </button>
        )}
        {isContextMenuOpen && <PathBar />}
      </div>
      <div>
        {children}
        {shape.type === "Shape" &&
          path.map((pathMethod, i) => {
            if (pathMethod === "arc" || pathMethod === "bezier") {
              return (
                <div key={i}>
                  <div className={styles.tableRow}>
                    <span>{pathMethod}</span>
                    {["x", "y", "z"].map(axis => (
                      <InputText
                        callback={changeProperty}
                        slicePath={["shape", "path", i, pathMethod, 0, axis]}
                        label={axis}
                        key={axis}
                      />
                    ))}
                    {path.length !== 1 && (
                      <button onClick={() => removePath(i)}>D</button>
                    )}
                  </div>
                  <div className={styles.tableRow}>
                    {["x", "y", "z"].map(axis => (
                      <InputText
                        callback={changeProperty}
                        slicePath={["shape", "path", i, pathMethod, 1, axis]}
                        label={axis}
                        key={axis}
                      />
                    ))}
                  </div>
                  {pathMethod === "bezier" && (
                    <div className={styles.tableRow}>
                      {["x", "y", "z"].map(axis => (
                        <InputText
                          callback={changeProperty}
                          slicePath={["shape", "path", i, pathMethod, 2, axis]}
                          label={axis}
                          key={axis}
                        />
                      ))}
                    </div>
                  )}
                </div>
              );
            }
            return (
              <div className={styles.tableRow} key={i}>
                <span>{pathMethod}</span>
                {["x", "y", "z"].map(axis => (
                  <InputText
                    callback={changeProperty}
                    slicePath={["shape", "path", i, pathMethod, axis]}
                    label={axis}
                    key={axis}
                  />
                ))}
                {path.length !== 1 && (
                  <button onClick={() => removePath(i)}>D</button>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}
