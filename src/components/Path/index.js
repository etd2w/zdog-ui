import { useSelector } from "react-redux";
import { useContextMenu } from "../../hooks";
import PathBar from "../PathBar";
import InputText from "../InputText";
import styles from "./style.module.css";

export default function Path() {
  const [isContextMenuOpen, setIsContextMenuOpen] = useContextMenu(false);
  const path = useSelector(state => state.path);
  const shape = useSelector(state => state.shape);

  const changeProperty = (value, options) => {
    const { object } = options;

    if (object[3] === "arc" || object[3] === "bezier") {
      shape[object[1]][object[2]][object[3]][object[4]][object[5]] = parseFloat(
        value
      );
    } else {
      shape[object[1]][object[2]][object[3]][object[4]] = parseFloat(value);
    }

    shape.updatePath();
  };

  return (
    shape.type === "Shape" && (
      <div className={styles.layersBlock}>
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
            <div className={styles.padLeft}>Add</div>
          </button>
          {isContextMenuOpen && <PathBar />}
        </div>

        <div className={styles.contentBlock}>
          {path.map((type, index) => {
            if (type === "arc") {
              return (
                <div className={styles.pathRow} key={index}>
                  <span>{type}</span>
                  {["x", "y", "z"].map(axis => (
                    <InputText
                      callback={changeProperty}
                      options={{
                        object: ["shape", "path", index, type, 0, axis],
                        label: axis,
                      }}
                      key={axis}
                    />
                  ))}
                  <div>
                    {["x", "y", "z"].map(axis => (
                      <InputText
                        callback={changeProperty}
                        options={{
                          object: ["shape", "path", index, type, 1, axis],
                          label: axis,
                        }}
                        key={axis}
                      />
                    ))}
                  </div>
                </div>
              );
            } else if (type === "bezier") {
              return (
                <div className={styles.pathRow} key={index}>
                  <span>{type}</span>
                  {["x", "y", "z"].map(axis => (
                    <InputText
                      callback={changeProperty}
                      options={{
                        object: ["shape", "path", index, type, 0, axis],
                        label: axis,
                      }}
                      key={axis}
                    />
                  ))}
                  <div>
                    {["x", "y", "z"].map(axis => (
                      <InputText
                        callback={changeProperty}
                        options={{
                          object: ["shape", "path", index, type, 1, axis],
                          label: axis,
                        }}
                        key={axis}
                      />
                    ))}
                  </div>
                  <div>
                    {["x", "y", "z"].map(axis => (
                      <InputText
                        callback={changeProperty}
                        options={{
                          object: ["shape", "path", index, type, 2, axis],
                          label: axis,
                        }}
                        key={axis}
                      />
                    ))}
                  </div>
                </div>
              );
            }
            return (
              <div className={styles.pathRow} key={index}>
                <span>{type}</span>
                {["x", "y", "z"].map(axis => (
                  <InputText
                    callback={changeProperty}
                    options={{
                      object: ["shape", "path", index, type, axis],
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
