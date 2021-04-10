import { useSelector } from "react-redux";
import InputText from "../InputText";
import InputColor from "../InputColor";
import CheckBox from "../CheckBox";
import PathTable from "../PathTable";
import section from "../../styles/section.module.css";
import table from "../../styles/table.module.css";

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
    size: [{ property: "diameter", label: "Diameter" }],
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
    <section className={section.properties} key={shape.id}>
      <header className={section.header}>
        Shape
        {shape.id && <small className={section.small}>{shape.type}</small>}
      </header>

      <article className={section.article}>
        {shape.id && (
          // Table: Transform
          <table className={table.table}>
            <thead className={table.thead}>
              <tr>
                <th className={table.th}>Transform</th>
              </tr>
            </thead>
            <tbody className={table.tbody}>
              <tr className={table.tr}>
                <td className={table.td}>
                  <span>Position</span>
                  {["x", "y", "z"].map(axis => (
                    <InputText
                      callback={changeVector}
                      slicePath={["shape", "translate", axis]}
                      label={axis.toUpperCase()}
                      key={axis}
                    />
                  ))}
                </td>
              </tr>
              <tr className={table.tr}>
                <td className={table.td}>
                  <span>Rotation</span>
                  {["x", "y", "z"].map(axis => (
                    <InputText
                      callback={changeVector}
                      slicePath={["shape", "rotate", axis]}
                      label={axis.toUpperCase()}
                      key={axis}
                    />
                  ))}
                </td>
              </tr>
              <tr className={table.tr}>
                <td className={table.td}>
                  {shape.type === "Cone" ||
                  shape.type === "Hemisphere" ||
                  shape.type === "Cylinder" ? (
                    <InputText
                      callback={scaleBug}
                      slicePath={["shape", "scale", "x"]}
                      label="Scale"
                    />
                  ) : (
                    <>
                      <span>Scale</span>
                      {["x", "y", "z"].map(axis => (
                        <InputText
                          callback={changeVector}
                          slicePath={["shape", "scale", axis]}
                          label={axis.toUpperCase()}
                          key={axis}
                        />
                      ))}
                    </>
                  )}
                </td>
              </tr>
            </tbody>

            {/* Table: Size */}
            {shapes[shape.type] && (
              <>
                <thead className={table.thead}>
                  <tr>
                    <th className={table.th}>Size</th>
                  </tr>
                </thead>
                <tbody className={table.tbody}>
                  {shapes[shape.type].size.map(({ property, label }) => (
                    <tr className={table.tr} key={property}>
                      <td className={table.td}>
                        <InputText
                          callback={changeProperty}
                          slicePath={["shape", property]}
                          label={label}
                        />
                      </td>
                    </tr>
                  ))}
                  <tr className={table.tr}>
                    <td className={table.td}>
                      <CheckBox
                        callback={toggleStroke}
                        slicePath={["shape", "stroke"]}
                      />
                      <InputText
                        callback={changeStroke}
                        slicePath={["shape", "stroke"]}
                        label="Stroke"
                      />
                    </td>
                  </tr>
                </tbody>

                {/* Table: Style */}
                <thead className={table.thead}>
                  <tr>
                    <th className={table.th}>Style</th>
                  </tr>
                </thead>
                <tbody className={table.tbody}>
                  <tr className={table.tr}>
                    <td className={table.td}>
                      <CheckBox
                        callback={toggleProperty}
                        slicePath={["shape", "fill"]}
                        label="Fill"
                      />
                    </td>
                  </tr>
                  <tr className={table.tr}>
                    <td className={table.td}>
                      <InputColor
                        callback={changeColor}
                        slicePath={["shape", "color"]}
                        label="Color"
                      />
                    </td>
                  </tr>
                  {shapes[shape.type].style.map(({ property, label }) => (
                    <tr className={table.tr} key={property}>
                      <td className={table.td}>
                        <InputColor
                          callback={changeColor}
                          slicePath={["shape", ...property]}
                          label={label}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
                <PathTable>
                  {/* Property: Closed */}
                  <tr className={table.tr}>
                    <td className={table.td}>
                      <CheckBox
                        callback={toggleProperty}
                        slicePath={["shape", "closed"]}
                        label="Closed"
                      />
                    </td>
                  </tr>
                </PathTable>
              </>
            )}
          </table>
        )}
      </article>
    </section>
  );
}
