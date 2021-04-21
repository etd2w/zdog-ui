import { useSelector } from "react-redux";
import InputText from "../InputText";
import CheckBox from "../CheckBox";
import PathTable from "../PathTable";
import section from "../../styles/section.module.css";
import table from "../../styles/table.module.css";
import InputColor from "../InputColor";
import Section from "../../ui/Section/Section";
import { Table, TableRow } from "../../ui/Table/Table";

const shapes = {
  Rect: {
    size: [
      { property: "height", label: "Height" },
      { property: "width", label: "Width" },
    ],
    style: [{ property: ["backface"], label: "Back face" }],
  },
  RoundedRect: {
    size: [
      { property: "height", label: "Height" },
      { property: "width", label: "Width" },
      { property: "cornerRadius", label: "Corner radius" },
    ],
    style: [{ property: ["backface"], label: "Back face" }],
  },
  Ellipse: {
    size: [
      { property: "height", label: "Height" },
      { property: "width", label: "Width" },
      { property: "quarters", label: "Quarters" },
    ],
    style: [{ property: ["backface"], label: "Back face" }],
  },
  Polygon: {
    size: [
      { property: "radius", label: "Radius" },
      { property: "sides", label: "Sides" },
    ],
    style: [{ property: ["backface"], label: "Back face" }],
  },
  Shape: {
    size: [],
    style: [{ property: ["backface"], label: "Back face" }],
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

  const header = shape.id && (
    <small className={section.small}>{shape.type}</small>
  );

  return (
    <Section title="Properties" header={header}>
      {shape.id && (
        <Table name="Transform">
          <TableRow label="Position">
            {["x", "y", "z"].map(axis => (
              <InputText
                callback={changeVector}
                slicePath={["shape", "translate", axis]}
                label={axis.toUpperCase()}
                key={axis}
              />
            ))}
          </TableRow>
          <TableRow label="Rotation">
            {["x", "y", "z"].map(axis => (
              <InputText
                callback={changeVector}
                slicePath={["shape", "rotate", axis]}
                label={axis.toUpperCase()}
                key={axis}
              />
            ))}
          </TableRow>
          <TableRow label="Scale">
            {shape.type === "Cone" ||
            shape.type === "Hemisphere" ||
            shape.type === "Cylinder" ? (
              <InputText
                callback={scaleBug}
                slicePath={["shape", "scale", "x"]}
              />
            ) : (
              ["x", "y", "z"].map(axis => (
                <InputText
                  callback={changeVector}
                  slicePath={["shape", "scale", axis]}
                  label={axis.toUpperCase()}
                  key={axis}
                />
              ))
            )}
          </TableRow>
        </Table>
      )}

      {shapes[shape.type] && (
        <>
          <Table name="Size">
            {shapes[shape.type].size.map(({ property, label }) => (
              <TableRow label={label} key={property}>
                <InputText
                  callback={changeProperty}
                  slicePath={["shape", property]}
                />
              </TableRow>
            ))}
            <TableRow label="Stroke">
              <CheckBox
                callback={toggleStroke}
                slicePath={["shape", "stroke"]}
              />
              <InputText
                callback={changeStroke}
                slicePath={["shape", "stroke"]}
              />
            </TableRow>
          </Table>

          <Table name="Style">
            <TableRow label="Fill">
              <CheckBox
                callback={toggleProperty}
                slicePath={["shape", "fill"]}
              />
            </TableRow>
            <TableRow label="Fill">
              <InputColor
                callback={changeColor}
                slicePath={["shape", "color"]}
                label="Color"
              />
            </TableRow>
            {shapes[shape.type].style.map(({ property, label }) => (
              <TableRow key={property} label={label}>
                <InputColor
                  callback={changeColor}
                  slicePath={["shape", ...property]}
                  checkbox
                />
              </TableRow>
            ))}
          </Table>
          <PathTable>
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
    </Section>
  );
}
