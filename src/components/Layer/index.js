import { useState } from "react";
import { useContextMenu } from "../../hooks";
import ShapeBar from "../ShapeBar";
import styles from "./style.module.css";
import utils from "../../styles/utils.module.css";
import { useDispatch } from "react-redux";

export default function Layer({ layer }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isRenaming, setisRenaming] = useState(false);
  const [renameValue, setRenameValue] = useState(layer.name);
  const [isContextMenuOpen, setIsContextMenuOpen] = useContextMenu(false);
  const [isShapeBarOpen, setIsShapeBarOpen] = useContextMenu(false);
  const dispatch = useDispatch();
  let children = null;

  if (layer.children.length > 0) {
    children = layer.children.map(layer => {
      if (layer.id) {
        return <Layer layer={layer} key={layer.id} />;
      }
      return null;
    });
  }

  const handleVisible = () => {
    setIsVisible(!isVisible);
    layer.visible = !layer.visible;
  };

  const handleCopy = () => {
    const copyOfLayer = layer.copyGraph();
    copyOfLayer.addTo.updateFlatGraph();

    copyOfLayer.type = layer.type;
    copyOfLayer.name = `${layer.type} (copy)`;
    copyOfLayer.id = Math.random();

    dispatch({ type: "COPY_LAYER", payload: copyOfLayer });
    dispatch({ type: "SHAPE_SELECTED", payload: copyOfLayer });
  };

  const handleSelect = ({ shiftKey }) => {
    dispatch({
      type: "SHAPE_SELECTED",
      payload: { shape: layer, shiftKey },
    });
  };

  const handleRename = () => {
    setisRenaming(!isRenaming);
    if (!isRenaming) {
      setRenameValue(layer.name);
    } else {
      console.log(renameValue);
    }
  };

  const handleRemove = () => {
    layer.remove();
    dispatch({ type: "REMOVE_LAYER", payload: layer });
  };

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleContextMenu = event => {
    event.preventDefault();
    setIsContextMenuOpen(!isContextMenuOpen);
    setIsShapeBarOpen(false);
  };

  // Remove form this component later
  const handleInputChange = event => {
    setRenameValue(event.target.value);
  };

  return (
    <li className={styles.layer}>
      <div className={styles.body} onContextMenu={handleContextMenu}>
        <div>
          <button
            onClick={handleExpand}
            className={
              layer.children.length &&
              layer.children[layer.children.length - 1].id
                ? null
                : utils.invisible
            }
          >
            <svg
              width="9"
              height="9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              transform={isExpanded ? "rotate(90)" : ""}
            >
              <path d="M5.5 3.5l-5 3v-6l5 3z" fill="#fff" />
            </svg>
          </button>

          <button
            onClick={handleSelect}
            onDoubleClick={handleRename}
            className={isRenaming ? utils.hidden : styles.selectButton}
          >
            {renameValue}
          </button>

          <input
            type="text"
            className={isRenaming ? null : utils.hidden}
            onBlur={handleRename}
            value={renameValue}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <button className={styles.button} onClick={handleRemove}>
            <svg
              width="9"
              height="9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.036 0H.964A.965.965 0 000 .964v7.072C0 8.568.432 9 .964 9h7.072A.965.965 0 009 8.036V.964A.965.965 0 008.036 0zM1.848 5.304a.242.242 0 01-.24-.242V3.938c0-.132.108-.24.24-.24h5.304c.132 0 .24.108.24.24v1.126a.242.242 0 01-.24.24H1.848z"
                fill="#C23C2A"
              />
            </svg>
          </button>
          <button
            className={styles.btnAdd}
            onClick={() => setIsShapeBarOpen(!isShapeBarOpen)}
          >
            <svg
              width="9"
              height="9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.036 0H.964A.965.965 0 000 .964v7.072C0 8.568.432 9 .964 9h7.072A.965.965 0 009 8.036V.964A.965.965 0 008.036 0zm-.643 5.063a.242.242 0 01-.241.24H5.304v1.849a.242.242 0 01-.242.24H3.938a.242.242 0 01-.24-.24V5.304H1.847a.242.242 0 01-.24-.242V3.938c0-.132.108-.24.24-.24h1.848V1.847c0-.132.109-.24.241-.24h1.126c.132 0 .24.108.24.24v1.848h1.849c.132 0 .24.109.24.241v1.126z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>
      </div>
      <ul className={`${styles.children} ${isExpanded ? null : utils.hidden}`}>
        {children}
      </ul>
      {isContextMenuOpen && (
        <div className={styles.contextMenu}>
          <button onClick={handleCopy}>Copy the element</button>
          <button onClick={handleVisible}>
            {isVisible ? "Hide the element" : "Show the element"}
          </button>
          <button onClick={handleRemove}>Remove the element</button>
        </div>
      )}
      {isShapeBarOpen && <ShapeBar parent={layer} />}
    </li>
  );
}
