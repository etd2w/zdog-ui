import { useState } from "react";
import { useContextMenu } from "../../hooks";
import ShapeBar from "../ShapeBar";
import styles from "./layer.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Anchor } from "zdog";
import { ContextMenu, ContextMenuItem } from "../ContextMenu/ContextMenu";

const createListOfShapes = (parent, excludedChild) => {
  const listOfChildren = [];

  parent.children.forEach(child => {
    if (excludedChild) {
      if (child.id !== excludedChild.id) {
        listOfChildren.push(child);
      }
    } else {
      listOfChildren.push(child);
    }
  });

  if (parent.addTo) {
    return createListOfShapes(parent.addTo).concat(listOfChildren);
  } else {
    return listOfChildren;
  }
};

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
    if (layer.children.length > 0) {
      layer.children.forEach(child => {
        child.visible = layer.visible;
        child.updateFlatGraph();
      });
    }
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
    <li>
      <div className={styles.layer} onContextMenu={handleContextMenu}>
        <div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            disabled={!layer.children.length > 0}
          >
            <svg
              transform={isExpanded ? "rotate(90)" : ""}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill={layer.children.length > 0 ? "#ffffff" : "transparent"}
                d="M6.333 10.403V5.597c0-.333.426-.5.675-.265l2.543 2.404a.36.36 0 010 .528l-2.543 2.404c-.249.235-.675.068-.675-.265z"
              />
            </svg>
          </button>
        </div>
        <div>
          <button onClick={handleSelect}>{layer.name}</button>
        </div>
        <div>
          <button onClick={handleRemove}>
            <svg fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fill="#c23c2a"
                d="M11.929 3H4.07C3.48 3 3 3.48 3 4.071v7.858C3 12.52 3.48 13 4.071 13h7.858C12.52 13 13 12.52 13 11.929V4.07C13 3.48 12.52 3 11.929 3zM5.054 8.893a.269.269 0 01-.268-.268v-1.25c0-.147.12-.268.268-.268h5.892c.148 0 .268.12.268.268v1.25c0 .147-.12.268-.268.268H5.054z"
              />
            </svg>
          </button>
          <button onClick={() => setIsShapeBarOpen(!isShapeBarOpen)}>
            <svg fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fill="#ffffff"
                d="M11.929 3H4.07C3.48 3 3 3.48 3 4.071v7.858C3 12.52 3.48 13 4.071 13h7.858C12.52 13 13 12.52 13 11.929V4.07C13 3.48 12.52 3 11.929 3zm-.715 5.625c0 .147-.12.268-.268.268H8.893v2.053c0 .148-.12.268-.268.268h-1.25a.269.269 0 01-.268-.268V8.893H5.054a.269.269 0 01-.268-.268v-1.25c0-.147.12-.268.268-.268h2.053V5.054c0-.148.12-.268.268-.268h1.25c.147 0 .268.12.268.268v2.053h2.053c.148 0 .268.12.268.268v1.25z"
              />
            </svg>
          </button>
        </div>
      </div>
      {/* <div className={styles.body} onContextMenu={handleContextMenu}>
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
      </div> */}
      <ul className={`${isExpanded ? "stack" : "hidden"}`}>{children}</ul>
      {isContextMenuOpen && (
        <ContextMenu>
          <div>
            <ContextMenuItem onClick={handleCopy}>
              Copy the element
            </ContextMenuItem>
            <ContextMenuItem onClick={handleVisible}>
              Show the element
            </ContextMenuItem>
            <ContextMenuItem onClick={handleMove}>
              Move the element
            </ContextMenuItem>
          </div>
          <div>
            <ContextMenuItem onClick={handleRemove}>
              Remove the element
            </ContextMenuItem>{" "}
          </div>
          {selectedShapes.length > 1 && (
            <div>
              <ContextMenuItem onClick={handleRemove}>
                Group Selection
              </ContextMenuItem>{" "}
            </div>
          )}
        </ContextMenu>
      )}
      {/* {isListOfShapesOpen && (
        <ContextMenu>
          {createListOfShapes(layer.addTo, layer).map(children => (
            <ContextMenuItem
              key={children.id}
              onClick={() => handleMove(children, layer)}
            >
              {children.name}
            </ContextMenuItem>
          ))}
        </ContextMenu>
      )} */}
      {isShapeBarOpen && (
        <ShapeBar parent={layer} onClick={() => setIsExpanded(true)} />
      )}
    </li>
  );
}
