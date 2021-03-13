import { useSelector } from "react-redux";
import InputText from "../InputText";
import InputColor from "../InputColor";
import CheckBox from "../CheckBox";
import styles from "./style.module.css";
import { useState } from "react";

const shapes = {
  Rect: ["height", "width"],
  RoundedRect: ["height", "width", "cornerRadius"],
  Ellipse: ["height", "width", "quarters"],
  Polygon: ["radius", "sides"],
  Hemisphere: ["diameter"],
  Cone: ["diameter", "length"],
  Cylinder: ["diameter", "length", ["frontFace", "backFace"]],
  Box: [
    "height",
    "width",
    "depth",
    ["leftFace", "rightFace", "rearFace", "frontFace", "topFace", "bottomFace"],
  ],
};

export default function ShapeProps() {
  const shape = useSelector(state => state.shape);
  const [isScale, setIsScale] = useState(false);
  const [isColor, setIsColor] = useState(false);

  const handleChange = (value, options) => {
    shape[options.property] = value;
    shape.updatePath();
  };

  const handleVectorChange = (value, options) => {
    shape[options.object[1]][options.property] = parseFloat(value);
    shape.updatePath();
  };

  const changeColor = (value, options) => {
    if (typeof options.object !== "string") {
      shape[options.object[1]][options.property] = value;
    } else {
      shape.color = value;
    }
  };

  const toggleStroke = () => {
    if (shape.stroke) {
      shape.prevStroke = shape.stroke;
      shape.stroke = false;
    } else {
      shape.stroke = shape.prevStroke;
    }
  };

  const toggleFill = () => {
    shape.fill = !shape.fill;
  };

  const toggleFace = options => {
    shape[options.property] = !shape[options.property];
  };

  return (
    <div className={styles.shapeProps} key={shape.id}>
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
                {shapes[shape.type].map(property => {
                  if (typeof property !== "object") {
                    return (
                      <div className={styles.tableRow} key={property}>
                        <InputText
                          callback={handleChange}
                          options={{
                            object: "shape",
                            property: property,
                            label: property,
                          }}
                        />
                      </div>
                    );
                  } else return null;
                })}

                <div className={styles.tableRow}>
                  <CheckBox
                    callback={toggleStroke}
                    options={{ object: "shape", property: "stroke" }}
                  />
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
                  <button
                    className={styles.btnExpand}
                    onClick={() => setIsScale(!isScale)}
                  >
                    <svg
                      width="6"
                      height="7"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      transform={isScale ? "rotate(90)" : ""}
                    >
                      <path d="M5.5 3.5l-5 3v-6l5 3z" fill="#fff" />
                    </svg>
                  </button>
                  <span>Scale</span>
                </div>
                {isScale && (
                  <>
                    {["x", "y", "z"].map(axis => (
                      <div className={styles.tableRow} key={axis}>
                        <InputText
                          callback={handleVectorChange}
                          options={{
                            object: ["shape", "scale"],
                            property: axis,
                            label: `Scale ${axis.toUpperCase()}`,
                          }}
                        />
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>

            <div className={styles.table}>
              <div className={styles.tableHead}>
                <span>Position</span>
              </div>

              <div className={styles.tableBody}>
                {["x", "y", "z"].map(axis => (
                  <div className={styles.tableRow} key={axis}>
                    <InputText
                      callback={handleVectorChange}
                      options={{
                        object: ["shape", "translate"],
                        property: axis,
                        label: `Position ${axis.toUpperCase()}`,
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.table}>
              <div className={styles.tableHead}>
                <span>Rotation</span>
              </div>

              <div className={styles.tableBody}>
                {["x", "y", "z"].map(axis => (
                  <div className={styles.tableRow} key={axis}>
                    <InputText
                      callback={handleVectorChange}
                      options={{
                        object: ["shape", "rotate"],
                        property: axis,
                        label: `Rotate ${axis.toUpperCase()}`,
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.table}>
              <div className={styles.tableHead}>
                <span>Style</span>
              </div>

              <div className={styles.tableBody}>
                <div className={styles.tableRow}>
                  {shape.type === "Box" && (
                    <button
                      className={styles.btnExpand}
                      onClick={() => setIsColor(!isColor)}
                    >
                      <svg
                        width="6"
                        height="7"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        transform={isColor ? "rotate(90)" : ""}
                      >
                        <path d="M5.5 3.5l-5 3v-6l5 3z" fill="#fff" />
                      </svg>
                    </button>
                  )}

                  <span>Color</span>

                  {shape.type !== "Box" && (
                    <InputColor
                      callback={changeColor}
                      options={{ object: "shape", property: "color" }}
                    />
                  )}
                </div>

                {shape.type === "Box" &&
                  isColor &&
                  shapes[shape.type][shapes[shape.type].length - 1].map(
                    property => (
                      <div className={styles.tableRow} key={property}>
                        <CheckBox
                          callback={toggleFace}
                          options={{ object: "shape", property: property }}
                        />
                        <span>{property}</span>
                        <InputColor
                          callback={changeColor}
                          options={{
                            object: ["shape", `${property}Rect`],
                            property: "color",
                          }}
                        />
                      </div>
                    )
                  )}

                <div className={styles.tableRow}>
                  <span>Fill</span>
                  <CheckBox
                    callback={toggleFill}
                    options={{ object: "shape", property: "fill" }}
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
