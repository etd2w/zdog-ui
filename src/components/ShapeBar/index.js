import { useDispatch, useSelector } from "react-redux";
import Zdog from "zdog";
import styles from "./style.module.css";

const shapeTypes = [
  "Anchor",
  "Box",
  "Cone",
  "Cylinder",
  "Ellipse",
  "Group",
  "Hemisphere",
  "Polygon",
  "Rect",
  "RoundedRect",
  "Shape",
];

const defaults = {
  width: 80,
  height: 80,
  stroke: 20,
  diameter: 80,
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
    const child = new Zdog[typeOfChild](defaults);
    child.type = typeOfChild;
    child.name = typeOfChild;
    child.id = Math.random();

    if (!parent) {
      illo.addChild(child);
      dispatch({ type: "ADD_LAYER", payload: child });
    } else {
      parent.addChild(child);
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
