import { useSelector } from "react-redux";
import InputText from "../InputText";
import InputColor from "../InputColor";
import CheckBox from "../CheckBox";
import styles from "./style.module.css";
import PathTable from "../PathTable";

const shapes = {
  Rect: {
    size: [
      { property: "height", label: "Height" },
      { property: "width", label: "Width" },
    ],
    style: [],
  },
  RoundedRect: {
    size: [
      { property: "height", label: "Height" },
      { property: "width", label: "Width" },
      { property: "cornerRadius", label: "Corner radius" },
    ],
    style: [],
  },
  Ellipse: {
    size: [
      { property: "height", label: "Height" },
      { property: "width", label: "Width" },
      { property: "quarters", label: "Quarters" },
    ],
    style: [],
  },
  Polygon: {
    size: [
      { property: "radius", label: "Radius" },
      { property: "sides", label: "Sides" },
    ],
    style: [],
  },
  Shape: {
    size: [],
    style: [],
  },
  Hemisphere: {
    size: [{ property: ["diameter"], label: "Diameter" }],
    style: [{ property: ["backface"], label: "Back face" }],
  },
  Cone: {
    size: [
      { property: "diameter", label: "Diameter" },
      { property: "length", label: "Length" },
    ],
    style: [{ property: ["backface"], label: "Back face" }],
  },
  Cylinder: {
    size: [
      { property: "diameter", label: "Diameter" },
      { property: "length", label: "Length" },
    ],
    style: [
      { property: ["frontBase", "color"], label: "Front face" },
      { property: ["rearBase", "color"], label: "Back face" },
    ],
  },
  Box: {
    size: [
      { property: "height", label: "Height" },
      { property: "width", label: "Width" },
      { property: "depth", label: "Depth" },
    ],
    style: [
      { property: ["frontFace"], label: "Front face" },
      { property: ["leftFace"], label: "Left face" },
      { property: ["rightFace"], label: "Right face" },
      { property: ["topFace"], label: "Top face" },
      { property: ["bottomFace"], label: "Bottom face" },
      { property: ["rearFace"], label: "Back face" },
    ],
  },
};

const commonTables = [
  {
    property: "translate",
    name: "Position",
    rowName: "Move",
  },
  {
    property: "rotate",
    name: "Rotation",
    rowName: "Rotate",
  },
];

export default function ShapeProps() {
  const shape = useSelector(state => state.shape);

  const changeProperty = (value, property) => {
    if (
      (shape.type === "Hemisphere" || shape.type === "Cone") &&
      property === "diameter"
    ) {
      shape.width = value;
      shape.height = value;
    } else if (shape.type === "Cone" && property === "length") {
      shape.apex.translate.z = value;
    } else if (shape.type === "Cylinder" && property === "length") {
      shape.frontBase.translate.z = value / 2;
      shape.rearBase.translate.z = -value / 2;
    } else if (shape.type === "Cylinder" && property === "diameter") {
      shape.frontBase.diameter = value;
      shape.rearBase.diameter = value;
      shape.frontBase.updatePath();
      shape.rearBase.updatePath();
    } else if (shape.type === "Shape") {
      console.log(shape.path);
      return;
    }
    shape[property] = value;
    shape.updatePath();
  };

  const changeColor = (value, property, partOfShape) => {
    if (partOfShape !== "shape") {
      shape[partOfShape][property] = value;
    } else {
      shape[property] = value;
    }
    shape.updatePath();
  };

  const changeVector = (value, property, vector) => {
    if (vector === "rotate") {
      shape.rotate[property] = (value * Math.PI) / 180;
    } else {
      shape[vector][property] = value;
    }
  };

  const scaleBug = value => {
    shape.scale.set({ x: value, y: value, z: value });
  };

  const toggleProperty = property => {
    shape[property] = !shape[property];
  };

  const changeStroke = value => {
    if (!shape.stroke && shape.stroke !== 0) {
      shape.prevStroke = value;
    } else {
      shape.stroke = value;
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

  return (
    <div className={styles.shapeProps} key={shape.id}>
      <div className={styles.header}>
        <span className={styles.title}>Shape</span>
        {shape.id && <span className={styles.subTitle}>{shape.type}</span>}
      </div>

      <div className={styles.contentBlock}>
        {shape.id && (
          <>
            {shapes[shape.type] && (
              <div>
                <div className={styles.tableHead}>
                  <span>Size</span>
                </div>
                {/* Shape specific properties for size */}
                {shapes[shape.type].size.map(({ property, label }) => (
                  <div className={styles.tableRow} key={property}>
                    <InputText
                      callback={changeProperty}
                      slicePath={["shape", property]}
                      label={label}
                    />
                  </div>
                ))}
                {/* Property: Stroke */}
                <div className={styles.tableRow}>
                  <CheckBox
                    callback={toggleStroke}
                    slicePath={["shape", "stroke"]}
                  />
                  <InputText
                    callback={changeStroke}
                    slicePath={["shape", "stroke"]}
                    label="Stroke"
                  />
                </div>
              </div>
            )}

            {shapes[shape.type] && (
              <div>
                <div className={styles.tableHead}>
                  <span>Styles</span>
                </div>
                <div>
                  {/* Property: Fill */}
                  <div className={styles.tableRow}>
                    <CheckBox
                      callback={toggleProperty}
                      slicePath={["shape", "fill"]}
                      label="Fill"
                    />
                  </div>
                  {/* Property: Color */}
                  <div className={styles.tableRow}>
                    <InputColor
                      callback={changeColor}
                      slicePath={["shape", "color"]}
                      label="Color"
                    />
                  </div>
                  {/* Shape specific properties for styles */}
                  {shapes[shape.type].style.map(({ property, label }) => (
                    <div className={styles.tableRow} key={property}>
                      <InputColor
                        callback={changeColor}
                        slicePath={["shape", ...property]}
                        label={label}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
            <PathTable>
              {/* Property: Closed */}
              <div className={styles.tableRow}>
                <CheckBox
                  callback={toggleProperty}
                  slicePath={["shape", "closed"]}
                  label="Closed"
                />
              </div>
            </PathTable>
            <div>
              <div className={styles.tableHead}>
                <span>Scale</span>
              </div>

              <div>
                {shape.type === "Cone" ||
                shape.type === "Hemisphere" ||
                shape.type === "Cylinder" ? (
                  <div className={styles.tableRow}>
                    <InputText
                      callback={scaleBug}
                      slicePath={["shape", "scale", "x"]}
                      label="Scale"
                    />
                  </div>
                ) : (
                  ["x", "y", "z"].map(axis => (
                    <div className={styles.tableRow} key={axis}>
                      <InputText
                        callback={changeVector}
                        slicePath={["shape", "scale", axis]}
                        label={`Scale ${axis.toUpperCase()}`}
                      />
                    </div>
                  ))
                )}
              </div>
            </div>

            {commonTables.map(({ property, name, rowName }) => (
              <div key={property}>
                <div className={styles.tableHead}>
                  <span>{name}</span>
                </div>
                <div>
                  {["x", "y", "z"].map(axis => (
                    <div className={styles.tableRow} key={axis}>
                      <InputText
                        callback={changeVector}
                        slicePath={["shape", property, axis]}
                        label={`${rowName} ${axis.toUpperCase()}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
