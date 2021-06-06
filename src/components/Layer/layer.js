import { useState } from "react";
import { useContextMenu } from "../../hooks";
import ShapeBar from "../ShapeBar";
import styles from "./layer.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Anchor } from "zdog";
import Zdog from "zdog";
import { ContextMenu, ContextMenuItem } from "../ContextMenu/ContextMenu";

const revive = child => {
  const newChild = new Zdog[child.type]({ ...child });
  newChild.id = child.id;
  newChild.name = child.name;
  newChild.type = child.type;

  if (child.children) {
    child.children.forEach(item => {
      if (item.id) {
        newChild.addChild(revive(item));
      }
    });
  }

  return newChild;
};

const hide = (model, value = true) => {
  model.visible = !value;
  model.children?.forEach(child => {
    hide(child, value);
  });
};

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
  const illo = useSelector(state => state.illo);
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
    hide(layer, layer.visible);
  };

  const handleCopy = () => {
    const copyOfLayer = revive(JSON.parse(JSON.stringify(layer)));
    copyOfLayer.id = Math.random();

    layer.addTo.addChild(copyOfLayer);

    // copyOfLayer.addTo.updateFlatGraph();

    dispatch({ type: "LAYER_ADDED", payload: copyOfLayer });
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
    dispatch({ type: "LAYER_REMOVED", payload: layer });
    layer.remove();
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
          {isRenaming ? (
            <input
              autoFocus
              type="text"
              onBlur={handleRename}
              value={renameValue}
              onChange={handleInputChange}
            />
          ) : (
            <button onClick={handleSelect} onDoubleClick={handleRename}>
              {layer.name}
            </button>
          )}
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
      <ul className={`${isExpanded ? "stack" : "hidden"}`}>{children}</ul>
      {isContextMenuOpen && (
        <ContextMenu>
          <div>
            <ContextMenuItem onClick={handleRename}>
              Rename the element
            </ContextMenuItem>
            <ContextMenuItem onClick={handleCopy}>
              Copy the element
            </ContextMenuItem>
            <ContextMenuItem onClick={handleVisible}>
              {isVisible ? "Hide the element" : "Show the element"}
            </ContextMenuItem>
            <ContextMenuItem onClick={() => setIsListOfShapesOpen(true)}>
              Move the element
            </ContextMenuItem>
          </div>
          <div>
            <ContextMenuItem onClick={handleRemove}>
              Remove the element
            </ContextMenuItem>
          </div>
          {selectedShapes.length > 1 && (
            <div>
              <ContextMenuItem onClick={handleGroup}>
                Group Selection
              </ContextMenuItem>
            </div>
          )}
        </ContextMenu>
      )}
      {isListOfShapesOpen && (
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
      )}
      {isShapeBarOpen && (
        <ShapeBar parent={layer} onClick={() => setIsExpanded(true)} />
      )}
    </li>
  );
}
