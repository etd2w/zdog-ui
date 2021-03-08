import { useSelector } from "react-redux";
import InputText from "../InputText";
import InputColor from "../InputColor";
import styles from "./style.module.css";

export default function ShapeProps() {
  const shape = useSelector(state => state.shape);

  const handleChange = (value, options) => {
    shape[options.property] = value;
    shape.updatePath();
  };

  const handlePosRot = (value, options) => {
    shape[options.object[1]][options.property] = parseFloat(value);
    shape.updatePath();
  };

  const changeColor = value => {
    shape.color = value;
  };

  return (
    <div key={shape.id}>
      <div className={styles.header}>
        <span className={styles.title}>Shape</span>
        {shape.id && <span className={styles.subTitle}>{shape.type}</span>}
      </div>

      <div className={styles.contentBlock}>
        {shape.id && (
          <>
            <div className={styles.table}>
              <div className={styles.tableHead}>
                <span>Size</span>
              </div>

              <div className={styles.tableBody}>
                <div className={styles.tableRow}>
                  <InputText
                    callback={handleChange}
                    options={{
                      object: "shape",
                      property: "height",
                      label: "Height",
                    }}
                  />
                </div>
                <div className={styles.tableRow}>
                  <InputText
                    callback={handleChange}
                    options={{
                      object: "shape",
                      property: "width",
                      label: "Width",
                    }}
                  />
                </div>
                <div className={styles.tableRow}>
                  <InputText
                    callback={handleChange}
                    options={{
                      object: "shape",
                      property: "depth",
                      label: "Depth",
                    }}
                  />
                </div>
                <div className={styles.tableRow}>
                  <InputText
                    callback={handleChange}
                    options={{
                      object: "shape",
                      property: "stroke",
                      label: "Stroke",
                    }}
                  />
                </div>
                <div className={styles.tableRow}>
                  <InputText
                    callback={handleChange}
                    options={{
                      object: "shape",
                      property: "scale",
                      label: "Scale",
                    }}
                  />
                </div>
              </div>
            </div>

            <div className={styles.table}>
              <div className={styles.tableHead}>
                <span>Position</span>
              </div>

              <div className={styles.tableBody}>
                <div className={styles.tableRow}>
                  <InputText
                    callback={handlePosRot}
                    options={{
                      object: ["shape", "translate"],
                      property: "x",
                      label: "Position X",
                    }}
                  />
                </div>
                <div className={styles.tableRow}>
                  <InputText
                    initValue={shape.translate.y}
                    callback={handlePosRot}
                    options={{
                      object: ["shape", "translate"],
                      property: "y",
                      label: "Position Y",
                    }}
                  />
                </div>
                <div className={styles.tableRow}>
                  <InputText
                    initValue={shape.translate.z}
                    callback={handlePosRot}
                    options={{
                      object: ["shape", "translate"],
                      property: "z",
                      label: "Position Z",
                    }}
                  />
                </div>
              </div>
            </div>

            <div className={styles.table}>
              <div className={styles.tableHead}>
                <span>Rotation</span>
              </div>

              <div className={styles.tableBody}>
                <div className={styles.tableRow}>
                  <InputText
                    initValue={shape.rotate.x}
                    callback={handlePosRot}
                    options={{
                      object: ["shape", "rotate"],
                      property: "x",
                      label: "Rotate X",
                    }}
                  />
                </div>
                <div className={styles.tableRow}>
                  <InputText
                    initValue={shape.rotate.y}
                    callback={handlePosRot}
                    options={{
                      object: ["shape", "rotate"],
                      property: "y",
                      label: "Rotate X",
                    }}
                  />
                </div>
                <div className={styles.tableRow}>
                  <InputText
                    initValue={shape.rotate.z}
                    callback={handlePosRot}
                    options={{
                      object: ["shape", "rotate"],
                      property: "z",
                      label: "Rotate X",
                    }}
                  />
                </div>
              </div>
            </div>

            <div className={styles.table}>
              <div className={styles.tableHead}>
                <span>Style</span>
              </div>

              <div className={styles.tableBody}>
                <div className={styles.tableRow}>
                  <span>Color</span>
                  <InputColor
                    callback={changeColor}
                    options={{ object: "shape", property: "color" }}
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
