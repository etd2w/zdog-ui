import * as Collapsible from "@radix-ui/react-collapsible";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCopy, createShape, getIllo, hideShape } from "../../utils";
import Dropdown from "../Dropdown";
import LayerContextMenu from "./LayerContextMenu/LayerContextMenu";
import styles from "./styles.module.css";

export default function Layer({ layer }) {
  const [children, setChildren] = useState(layer.children);
  const [isRenaming, setIsRenaming] = useState(false);
  const [isHidden, setIsHidden] = useState(layer.visible);
  const [isOpen, setIsOpen] = useState(false);

  const selectedLayers = useSelector(state => state.selectedShapes);
  const dispatch = useDispatch();

  useEffect(() => {
    setChildren(layer.children);
  }, [layer.children]);

  const addChildren = type => {
    const child = createShape(type);
    layer.addChild(child);

    setIsOpen(true);
    dispatch({ type: "SHAPE_SELECTED", payload: child });
  };

  const handleSelect = ({ shiftKey }) => {
    dispatch({
      type: "SHAPE_SELECTED",
      payload: { shape: layer, shiftKey },
    });
  };

  const handleDuplicate = () => {
    const copyOfLayer = createCopy(layer);
    dispatch({ type: "LAYER_ADDED", payload: copyOfLayer });
    dispatch({ type: "SHAPE_SELECTED", payload: copyOfLayer });
  };

  const handleRemove = () => {
    dispatch({ type: "LAYER_REMOVED", payload: layer });
    layer.remove();
    layer.addTo.updateFlatGraph();
  };

  const toggleHidden = () => {
    setIsHidden(!isHidden);
    hideShape(layer, layer.visible);
  };

  const handleRename = event => {
    setIsRenaming(!isRenaming);
    layer.name = event.target.value;
  };

  const handleGroup = () => {
    const newGroup = createShape("Anchor");
    layer.addTo.addChild(newGroup);
    newGroup.name = "My group";
    dispatch({ type: "SHAPE_SELECTED", payload: newGroup });
    dispatch({ type: "LAYER_ADDED", payload: newGroup });
    selectedLayers.forEach(shape => {
      dispatch({ type: "LAYER_REMOVED", payload: shape });
      newGroup.addChild(shape);
    });
  };

  const handleMove = newParent => {
    if (newParent.children.indexOf(layer) !== -1) return;
    dispatch({ type: "LAYER_REMOVED", payload: layer });
    dispatch({ type: "SHAPE_SELECTED", payload: newParent });
    newParent.addChild(layer);
    newParent.updateFlatGraph();
  };

  return (
    <LayerContextMenu
      handlers={{
        handleRemove,
        toggleHidden,
        handleDuplicate,
        handleGroup,
        handleMove,
      }}
      moveToList={getIllo(layer).flatGraph}
    >
      <Collapsible.Root open={isOpen}>
        <div className={styles.layer}>
          <Collapsible.Button onClick={() => setIsOpen(!isOpen)}>
            <svg fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fill={children ? "#ffffff" : "transparent"}
                d="M6.333 10.403V5.597c0-.333.426-.5.675-.265l2.543 2.404a.36.36 0 010 .528l-2.543 2.404c-.249.235-.675.068-.675-.265z"
              />
            </svg>
          </Collapsible.Button>
          <span style={{ color: isHidden ? "#a9cf54" : "#7d8b5e" }}>
            {isRenaming ? (
              <input
                autoFocus
                type="text"
                onBlur={handleRename}
                defaultValue={layer.name}
              />
            ) : (
              <button
                onClick={handleSelect}
                onDoubleClick={() => setIsRenaming(true)}
              >
                {layer.name}
              </button>
            )}
          </span>
          <button onClick={handleRemove}>
            <svg fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fill="#c23c2a"
                d="M11.929 3H4.07C3.48 3 3 3.48 3 4.071v7.858C3 12.52 3.48 13 4.071 13h7.858C12.52 13 13 12.52 13 11.929V4.07C13 3.48 12.52 3 11.929 3zM5.054 8.893a.269.269 0 01-.268-.268v-1.25c0-.147.12-.268.268-.268h5.892c.148 0 .268.12.268.268v1.25c0 .147-.12.268-.268.268H5.054z"
              />
            </svg>
          </button>
          <Dropdown onSelect={addChildren}>
            <svg fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fill="#ffffff"
                d="M11.929 3H4.07C3.48 3 3 3.48 3 4.071v7.858C3 12.52 3.48 13 4.071 13h7.858C12.52 13 13 12.52 13 11.929V4.07C13 3.48 12.52 3 11.929 3zm-.715 5.625c0 .147-.12.268-.268.268H8.893v2.053c0 .148-.12.268-.268.268h-1.25a.269.269 0 01-.268-.268V8.893H5.054a.269.269 0 01-.268-.268v-1.25c0-.147.12-.268.268-.268h2.053V5.054c0-.148.12-.268.268-.268h1.25c.147 0 .268.12.268.268v2.053h2.053c.148 0 .268.12.268.268v1.25z"
              />
            </svg>
          </Dropdown>
        </div>
        <Collapsible.Content className={styles.content}>
          {children.map(child => {
            if (child.id) {
              return (
                <Fragment key={child.id}>
                  <span className={styles.spacer}></span>
                  <Layer layer={child} />
                </Fragment>
              );
            }
            return null;
          })}
        </Collapsible.Content>
      </Collapsible.Root>
    </LayerContextMenu>
  );
}
