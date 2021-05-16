import { useDispatch, useSelector } from "react-redux";
import styles from "./style.module.css";

const pathTypes = ["line", "move", "arc", "bezier"];

export default function ShapeBar() {
  const shape = useSelector(state => state.shape);
  const dispatch = useDispatch();

  const handleClick = type => {
    if (type === "line" || type === "move") {
      shape.path.push({ [type]: { x: 0, y: 0, z: 0 } });
    } else if (type === "arc") {
      shape.path.push({
        [type]: [
          { x: 0, y: 0, z: 0 },
          { x: 0, y: 0, z: 0 },
        ],
      });
    } else {
      shape.path.push({
        [type]: [
          { x: 0, y: 0, z: 0 },
          { x: 0, y: 0, z: 0 },
          { x: 0, y: 0, z: 0 },
        ],
      });
    }

    dispatch({ type: "PATH_ADDED", payload: type });

    shape.updatePath();
    shape.updatePathCommands();
  };

  return (
    <div className={styles.pathBar}>
      {pathTypes.map((type, index) => (
        <button onClick={() => handleClick(type)} key={index}>
          {type}
        </button>
      ))}
    </div>
  );
}
