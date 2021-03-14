import { useSelector } from "react-redux";
import { useContextMenu } from "../../hooks";
import Layer from "../Layer";
import ShapeBar from "../ShapeBar";
import styles from "./style.module.css";

export default function ListOfLayers() {
  const [isContextMenuOpen, setIsContextMenuOpen] = useContextMenu(false);
  const layers = useSelector(state => state.layers);

  return (
    <div className={styles.layersBlock}>
      <div className={styles.header}>
        <span className={styles.title}>Components</span>
        <button
          onClick={() => setIsContextMenuOpen(!isContextMenuOpen)}
          className={styles.button}
        >
          <svg
            width="11"
            height="11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="11" height="11" rx="2" fill="#fff" />
            <path fill="#1C242D" d="M5 2h1v7H5z" />
            <path fill="#1C242D" d="M2 5h7v1H2z" />
          </svg>
          <div className={styles.padLeft}>Add</div>
        </button>
        {isContextMenuOpen && <ShapeBar />}
      </div>

      <div className={styles.contentBlock}>
        {layers.map(layer => (
          <Layer item={layer} key={layer.id} id={layer.id} />
        ))}
      </div>
    </div>
  );
}
