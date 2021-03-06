import { useSelector } from "react-redux";
import InputText, { Label } from "../../components/InputText";
import CheckBox from "../../components/CheckBox";
import PathTable from "../../components/PathTable";
import InputColor from "../../components/InputColor";
import Section from "../../ui/Section/Section";
import { Fragment } from "react";

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

export default function Inspector() {
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

  const header = shape.id && <small>{shape.type}</small>;

  return (
    <Section title="Properties" header={header}>
      <table>
        {shape.id && (
          <>
            <thead>
              <tr>
                <th scope="col">Transform</th>
                <th scope="col">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Position</td>
                <td>
                  {["x", "y", "z"].map(axis => (
                    <Fragment key={axis}>
                      <Label
                        slicePath={["shape", "translate", axis]}
                        id={`translate${axis}`}
                      >
                        {axis.toUpperCase()}
                      </Label>
                      <InputText
                        callback={changeVector}
                        slicePath={["shape", "translate", axis]}
                        id={`translate${axis}`}
                      />
                    </Fragment>
                  ))}
                </td>
              </tr>
              <tr>
                <td>Rotation</td>
                <td>
                  {["x", "y", "z"].map(axis => (
                    <Fragment key={axis}>
                      <Label
                        slicePath={["shape", "rotate", axis]}
                        id={`rotate${axis}`}
                      >
                        {axis.toUpperCase()}
                      </Label>
                      <InputText
                        callback={changeVector}
                        slicePath={["shape", "rotate", axis]}
                        id={`rotate${axis}`}
                      />
                    </Fragment>
                  ))}
                </td>
              </tr>
              <tr>
                <td>
                  {shape.type === "Cone" ||
                  shape.type === "Hemisphere" ||
                  shape.type === "Cylinder" ? (
                    <Label slicePath={["shape", "scale", "x"]} id="scalex">
                      Scale
                    </Label>
                  ) : (
                    "Scale"
                  )}
                </td>
                <td>
                  {shape.type === "Cone" ||
                  shape.type === "Hemisphere" ||
                  shape.type === "Cylinder" ? (
                    <InputText
                      callback={scaleBug}
                      slicePath={["shape", "scale", "x"]}
                      id="scalex"
                    />
                  ) : (
                    ["x", "y", "z"].map(axis => (
                      <Fragment key={axis}>
                        <Label
                          slicePath={["shape", "scale", axis]}
                          id={`scale${axis}`}
                        >
                          {axis.toUpperCase()}
                        </Label>
                        <InputText
                          callback={changeVector}
                          slicePath={["shape", "scale", axis]}
                          id={`scale${axis}`}
                        />
                      </Fragment>
                    ))
                  )}
                </td>
              </tr>
            </tbody>
          </>
        )}

        {shapes[shape.type] && (
          <>
            <thead>
              <tr>
                <th scope="col">Size</th>
                <th scope="col">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {shapes[shape.type].size.map(({ property, label }) => (
                <tr key={property}>
                  <td>
                    <Label id={property} slicePath={["shape", property]}>
                      {label}
                    </Label>
                  </td>
                  <td>
                    <InputText
                      id={property}
                      callback={changeProperty}
                      slicePath={["shape", property]}
                    />
                  </td>
                </tr>
              ))}
              <tr>
                <td>
                  <Label id={111} slicePath={["shape", "stroke"]}>
                    Stroke
                  </Label>
                </td>
                <td>
                  <CheckBox
                    callback={toggleStroke}
                    slicePath={["shape", "stroke"]}
                  />
                  <InputText
                    callback={changeStroke}
                    slicePath={["shape", "stroke"]}
                    id={111}
                  />
                </td>
              </tr>
            </tbody>

            <thead>
              <tr>
                <th scope="col">Style</th>
                <th scope="col">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Fill</td>
                <td>
                  <CheckBox
                    callback={toggleProperty}
                    slicePath={["shape", "fill"]}
                  />
                </td>
              </tr>
              <tr>
                <td>Color</td>
                <td>
                  <InputColor
                    callback={changeColor}
                    slicePath={["shape", "color"]}
                  />
                </td>
              </tr>
              {shapes[shape.type].style.map(({ property, label }) => (
                <tr key={property}>
                  <td>{label}</td>
                  <td>
                    <InputColor
                      callback={changeColor}
                      slicePath={["shape", ...property]}
                      checkbox
                    />
                  </td>
                </tr>
              ))}
            </tbody>
            <PathTable>
              <tr>
                <td>Closed</td>
                <td>
                  <CheckBox
                    callback={toggleProperty}
                    slicePath={["shape", "closed"]}
                  />
                </td>
              </tr>
            </PathTable>
          </>
        )}
      </table>
    </Section>
  );
}
