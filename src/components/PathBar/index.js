import { Vector } from "zdog";
import { useDispatch, useSelector } from "react-redux";
import styles from "./style.module.css";

const pathTypes = ["line", "move", "arc", "bezier"];

export default function ShapeBar() {
  const shape = useSelector(state => state.shape);
  const dispatch = useDispatch();

  const handleClick = type => {
    dispatch({ type: "PATH_ADDED", payload: type });

    if (type === "line" || type === "move") {
      shape.path.push({ [type]: new Vector() });
    } else if (type === "arc") {
      shape.path.push({
        [type]: [new Vector(), new Vector()],
      });
    } else {
      shape.path.push({
        [type]: [new Vector(), new Vector(), new Vector()],
      });
    }
  };

  return (
    <div className={styles.shapeBar}>
      {pathTypes.map((type, index) => (
        <button onClick={() => handleClick(type)} key={index}>
          {type}
        </button>
      ))}
    </div>
  );
}
