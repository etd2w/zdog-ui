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
  Shape: [],
};

const convertRotation = value => Math.round(value * (180 / Math.PI));

export default function ShapeProps() {
  const shape = useSelector(state => state.shape);
  const [isScale, setIsScale] = useState(false);
  const [isColor, setIsColor] = useState(false);

  const changeProperty = (value, { property }) => {
    shape[property] = value;
    if (shape.updatePath) {
      shape.updatePath();
    }
  };

  const changeVector = (value, options) => {
    shape[options.object[1]][options.property] = parseFloat(value);
    if (shape.updatePath) {
      shape.updatePath();
    }
  };

  const rotateShape = (value, options) => {
    shape.rotate[options.property] = (value * Math.PI) / 180;
    if (shape.updatePath) {
      shape.updatePath();
    }
  };

  const changeColor = (value, options) => {
    if (typeof options.object !== "string") {
      shape[options.object[1]][options.property] = value;
    } else {
      shape.color = value;
    }
  };

  const toggleProperty = ({ property }) => {
    shape[property] = !shape[property];
  };

  const toggleStroke = () => {
    if (shape.stroke) {
      shape.prevStroke = shape.stroke;
      shape.stroke = false;
    } else {
      shape.stroke = shape.prevStroke;
    }
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
            {shape.type !== "Anchor" && shape.type !== "Group" && (
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
                            callback={changeProperty}
                            options={{
                              object: ["shape", property],
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
                      callback={changeProperty}
                      options={{
                        object: ["shape", "stroke"],
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
                            callback={changeVector}
                            options={{
                              object: ["shape", "scale", axis],
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
            )}

            <div className={styles.table}>
              <div className={styles.tableHead}>
                <span>Position</span>
              </div>

              <div className={styles.tableBody}>
                {["x", "y", "z"].map(axis => (
                  <div className={styles.tableRow} key={axis}>
                    <InputText
                      callback={changeVector}
                      options={{
                        object: ["shape", "translate", axis],
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
                      callback={rotateShape}
                      options={{
                        object: ["shape", "rotate", axis],
                        property: axis,
                        label: `Rotate ${axis.toUpperCase()}`,
                        validate: convertRotation,
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {shape.type !== "Anchor" && shape.type !== "Group" && (
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
                            callback={toggleProperty}
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
                      callback={toggleProperty}
                      options={{ object: "shape", property: "fill" }}
                    />
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
