import { useState } from "react";
import { useContextMenu } from "../../hooks";
import ShapeBar from "../ShapeBar";
import styles from "./style.module.css";
import utils from "../../styles/utils.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Anchor } from "zdog";
import ContextBar from "../ContextBar";

export default function Layer({ layer }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isRenaming, setisRenaming] = useState(false);
  const [renameValue, setRenameValue] = useState(layer.name);
  const [isContextMenuOpen, setIsContextMenuOpen] = useContextMenu(false);
  const [isListOfShapesOpen, setIsListOfShapesOpen] = useContextMenu(false);
  const [isShapeBarOpen, setIsShapeBarOpen] = useContextMenu(false);
  const dispatch = useDispatch();
  const selectedShapes = useSelector(state => state.selectedShapes);
  let children = null;

  if (layer.children.length > 0) {
    children = layer.children.map(children => {
      if (children.id) {
        return <Layer layer={children} key={children.id} />;
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
    copyOfLayer.name = `${layer.name} (copy)`;
    copyOfLayer.id = Math.random();

    copyOfLayer.children?.forEach((child, index) => {
      child.type = layer.children[index].type;
      child.name = layer.children[index].name;
      child.id = Math.random();
    });

    dispatch({ type: "LAYER_COPIED", payload: copyOfLayer });
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
      layer.name = renameValue;
    }
  };

  const handleMove = (parent, child) => {
    dispatch({ type: "LAYER_REMOVED", payload: child });
    dispatch({ type: "SHAPE_SELECTED", payload: parent });
    parent.addChild(child);
    parent.updateFlatGraph();
  };

  const handleRemove = () => {
    layer.remove();
    dispatch({ type: "LAYER_REMOVED", payload: layer });
    layer.addTo.updateFlatGraph();
  };

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleContextMenu = event => {
    event.preventDefault();
    setIsContextMenuOpen(!isContextMenuOpen);
    setIsShapeBarOpen(false);
  };

  const handleGroup = () => {
    const newGroup = new Anchor({
      addTo: layer.addTo,
    });
    newGroup.name = "My group";
    newGroup.type = "Anchor";
    newGroup.id = Math.random();
    dispatch({ type: "SHAPE_SELECTED", payload: newGroup });
    dispatch({ type: "LAYER_ADDED", payload: newGroup });

    selectedShapes.forEach(shape => {
      dispatch({ type: "LAYER_REMOVED", payload: shape });
      newGroup.addChild(shape);
    });
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
          <button onClick={() => setIsListOfShapesOpen(true)}>
            Move to ...
          </button>
          <button onClick={handleVisible}>
            {isVisible ? "Hide the element" : "Show the element"}
          </button>
          <button onClick={handleRemove}>Remove the element</button>
          {selectedShapes.length > 1 && (
            <button onClick={handleGroup}>Group selection</button>
          )}
        </div>
      )}
      {isListOfShapesOpen && (
        <ContextBar>
          {layer.addTo.children.map(children => {
            if (layer.id !== children.id) {
              return (
                <button
                  key={children.id}
                  onClick={() => handleMove(children, layer)}
                >
                  {children.name}
                </button>
              );
            }
            return null;
          })}
        </ContextBar>
      )}
      {isShapeBarOpen && <ShapeBar parent={layer} />}
    </li>
  );
}
