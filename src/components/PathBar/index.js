import { Vector } from "zdog";
import { useSelector } from "react-redux";
import styles from "./style.module.css";

const pathTypes = ["line", "move", "arc", "bezier"];

export default function ShapeBar() {
  const shape = useSelector(state => state.shape);

  const handleClick = type => {
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

    shape.updatePath();
    shape.updatePathCommands();
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
