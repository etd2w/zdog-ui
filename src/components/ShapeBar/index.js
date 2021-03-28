import { useDispatch, useSelector } from "react-redux";
import Zdog from "zdog";
import styles from "./style.module.css";

const shapeTypes = [
  "Rect",
  "RoundedRect",
  "Ellipse",
  "Polygon",
  "Shape",
  "Hemisphere",
  "Cone",
  "Cylinder",
  "Box",
  "Anchor",
  "Group",
];

const defaults = {
  width: 80,
  height: 80,
  diameter: 80,
  stroke: 20,
  sides: 4,
  length: 80,
  radius: 40,
  depth: 80,
  color: "#a9cf54",
};

export default function ShapeBar({ parent }) {
  const illo = useSelector(state => state.illo);
  const dispatch = useDispatch();

  const handleClick = (typeOfChild, parent) => {
    let child;

    if (typeOfChild === "Shape") {
      child = new Zdog.Shape({
        path: new Array({ move: new Zdog.Vector() }),
        ...defaults,
      });
    } else {
      child = new Zdog[typeOfChild](defaults);
    }
    child.type = typeOfChild;
    child.name = typeOfChild;
    child.id = Math.random();

    dispatch({ type: "SHAPE_SELECTED", payload: child });

    if (!parent) {
      illo.addChild(child);
      dispatch({ type: "ADD_LAYER", payload: child });
    } else {
      parent.addChild(child);
      parent.updateFlatGraph();
    }
  };

  return (
    <div className={styles.shapeBar}>
      {shapeTypes.map((type, index) => (
        <button onClick={() => handleClick(type, parent)} key={index}>
          {type}
        </button>
      ))}
    </div>
  );
}
