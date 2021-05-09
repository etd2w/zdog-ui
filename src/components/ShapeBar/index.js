import { useDispatch, useSelector } from "react-redux";
import Zdog from "zdog";
import { ContextMenu, ContextMenuItem } from "../ContextMenu/ContextMenu";

const shapeTypes = [
  ["Rect", "RoundedRect", "Ellipse", "Polygon", "Shape"],
  ["Hemisphere", "Cone", "Cylinder", "Box"],
  ["Anchor", "Group"],
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

export default function ShapeBar({ parent, onClick }) {
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

    if (!parent) {
      illo.addChild(child);
    } else {
      parent.addChild(child);
      parent.updateFlatGraph();
    }
    dispatch({ type: "LAYER_ADDED", payload: child });
    dispatch({ type: "SHAPE_SELECTED", payload: child });

    if (onClick) {
      onClick();
    }

    localStorage.setItem("illo", JSON.stringify(illo));
  };

  return (
    <ContextMenu>
      {shapeTypes.map((section, i) => (
        <div key={i}>
          {section.map((type, i) => (
            <ContextMenuItem key={i} onClick={() => handleClick(type, parent)}>
              {type}
            </ContextMenuItem>
          ))}
        </div>
      ))}
    </ContextMenu>
  );
}
