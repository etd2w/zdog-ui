import { useSelector } from "react-redux";
import { useContextMenu } from "../../hooks";
import PathBar from "../PathBar";
import InputText from "../InputText";
import styles from "./style.module.css";

export default function Path() {
  const [isContextMenuOpen, setIsContextMenuOpen] = useContextMenu(false);
  const shape = useSelector(state => state.shape);

  const changeProperty = (value, options) => {
    const { object } = options;

    if (object[3] === "arc" || object[3] === "bezier") {
      shape.path[object[2]][object[3]][object[4]][object[5]] = parseFloat(
        value
      );
    } else {
      shape.path[object[2]][object[3]][object[4]] = parseFloat(value);
    }

    shape.updatePath();
  };

  return (
    shape.type === "Shape" && (
      <div className={styles.layersBlock} key={shape.id}>
        <div className={styles.header}>
          <span className={styles.title}>Path</span>
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
            <span>Add</span>
          </button>
          {isContextMenuOpen && <PathBar />}
        </div>

        <div className={styles.contentBlock}>
          {shape.pathCommands.map(({ method }, i) => {
            if (method === "arc" || method === "bezier") {
              return (
                <div key={i}>
                  <div className={styles.pathRow}>
                    <span>{method}</span>
                    {["x", "y", "z"].map(axis => (
                      <InputText
                        callback={changeProperty}
                        options={{
                          object: ["shape", "path", i, method, 0, axis],
                          label: axis,
                        }}
                        key={axis}
                      />
                    ))}
                  </div>
                  <div className={styles.pathRow}>
                    {["x", "y", "z"].map(axis => (
                      <InputText
                        callback={changeProperty}
                        options={{
                          object: ["shape", "path", i, method, 1, axis],
                          label: axis,
                        }}
                        key={axis}
                      />
                    ))}
                  </div>
                  {method === "bezier" && (
                    <div className={styles.pathRow}>
                      {["x", "y", "z"].map(axis => (
                        <InputText
                          callback={changeProperty}
                          options={{
                            object: ["shape", "path", i, method, 2, axis],
                            label: axis,
                          }}
                          key={axis}
                        />
                      ))}
                    </div>
                  )}
                </div>
              );
            }
            return (
              <div className={styles.pathRow} key={i}>
                <span>{method}</span>
                {["x", "y", "z"].map(axis => (
                  <InputText
                    callback={changeProperty}
                    options={{
                      object: ["shape", "path", i, method, axis],
                      label: axis,
                    }}
                    key={axis}
                  />
                ))}
              </div>
            );
          })}
        </div>
      </div>
    )
  );
}
