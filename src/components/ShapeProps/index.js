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
    <div>
      <div className={styles.header}>
        <span className={styles.title}>Shape</span>
        {shape.id && <span className={styles.subTitle}>{shape.id}</span>}
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
                  <span>Height</span>
                  <InputText
                    callback={handleChange}
                    options={{ object: "shape", property: "height" }}
                  />
                </div>
                <div className={styles.tableRow}>
                  <span>Width</span>
                  <InputText
                    callback={handleChange}
                    options={{ object: "shape", property: "width" }}
                  />
                </div>
                <div className={styles.tableRow}>
                  <span>Depth</span>
                  <InputText
                    callback={handleChange}
                    options={{ object: "shape", property: "depth" }}
                  />
                </div>
                <div className={styles.tableRow}>
                  <span>Stroke</span>
                  <InputText
                    callback={handleChange}
                    options={{ object: "shape", property: "stroke" }}
                  />
                </div>
                <div className={styles.tableRow}>
                  <span>Scale</span>
                  <InputText
                    callback={handleChange}
                    options={{ object: "shape", property: "scale" }}
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
                  <span>Position X</span>
                  <InputText
                    callback={handlePosRot}
                    options={{ object: ["shape", "translate"], property: "x" }}
                  />
                </div>
                <div className={styles.tableRow}>
                  <span>Position Y</span>
                  <InputText
                    initValue={shape.translate.y}
                    callback={handlePosRot}
                    options={{ object: ["shape", "translate"], property: "y" }}
                  />
                </div>
                <div className={styles.tableRow}>
                  <span>Position Z</span>
                  <InputText
                    initValue={shape.translate.z}
                    callback={handlePosRot}
                    options={{ object: ["shape", "translate"], property: "z" }}
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
                  <span>Rotate X</span>
                  <InputText
                    initValue={shape.rotate.x}
                    callback={handlePosRot}
                    options={{ object: ["shape", "rotate"], property: "x" }}
                  />
                </div>
                <div className={styles.tableRow}>
                  <span>Rotate Y</span>
                  <InputText
                    initValue={shape.rotate.y}
                    callback={handlePosRot}
                    options={{ object: ["shape", "rotate"], property: "y" }}
                  />
                </div>
                <div className={styles.tableRow}>
                  <span>Rotate Z</span>
                  <InputText
                    initValue={shape.rotate.z}
                    callback={handlePosRot}
                    options={{ object: ["shape", "rotate"], property: "z" }}
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
