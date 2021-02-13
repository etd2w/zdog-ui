import { useState } from "react";
import { useDispatch } from "react-redux";
import { useContextMenu } from "../../hooks";
import ShapeBar from "../ShapeBar";
import styles from "./style.module.css";

export default function Layer({ item }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isContextMenuOpen, setIsContextMenuOpen] = useContextMenu(false);
  const [isShapeBarOpen, setIsShapeBarOpen] = useContextMenu(false);
  const [isVisible, setIsVisible] = useState(true);
  const dispatch = useDispatch();

  let children = null;

  if (item.children.length > 0) {
    children = (
      <div className={styles.child}>
        {item.children.map(child => {
          if (child.id) {
            return <Layer item={child} key={child.id} />;
          } else {
            return null;
          }
        })}
      </div>
    );
  }

  const handleRemove = () => {
    item.remove();

    dispatch({ type: "REMOVE_LAYER", payload: item });
  };

  const handleVisible = () => {
    setIsVisible(!isVisible);

    item.visible = !item.visible;
  };

  const handleCopy = () => {
    const copyOfLayer = item.copy();

    copyOfLayer.type = item.type;
    copyOfLayer.name = `${item.type} (copy)`;
    copyOfLayer.id = Math.random();

    dispatch({ type: "COPY_LAYER", payload: copyOfLayer });
  };

  return (
    <>
      <div className={styles.layer}>
        <div
          className={
            item.children.length && item.children[item.children.length - 1].id
              ? styles.leftHalf
              : styles.leftPad
          }
        >
          {item.children.length > 0 &&
            item.children[item.children.length - 1].id && (
              <button
                className={styles.btnExpand}
                onClick={() => setIsExpanded(!isExpanded)}
              >
                <svg
                  width="6"
                  height="7"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  transform={isExpanded ? "rotate(90)" : ""}
                >
                  <path d="M5.5 3.5l-5 3v-6l5 3z" fill="#fff" />
                </svg>
              </button>
            )}

          <button className={isVisible ? styles.btnSelect : styles.hidden}>
            {item.name}
          </button>
        </div>

        <div className={styles.rightHelf}>
          <button
            className={styles.btnMenu}
            onClick={() => setIsContextMenuOpen(!isContextMenuOpen)}
          >
            <svg
              width="2"
              height="9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 1c0 .5523-.4477 1-1 1s-1-.4477-1-1 .4477-1 1-1 1 .4477 1 1zM2 8c0-.5523-.4477-1-1-1s-1 .4477-1 1 .4477 1 1 1 1-.4477 1-1zM2 4.5c0 .5523-.4477 1-1 1s-1-.4477-1-1 .4477-1 1-1 1 .4477 1 1z"
                fill="#fff"
              />
            </svg>
          </button>

          <button
            className={styles.btnAdd}
            onClick={() => setIsShapeBarOpen(!isShapeBarOpen)}
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
          </button>
        </div>

        {isContextMenuOpen && (
          <div className={styles.layerMenu}>
            <button onClick={handleCopy}>Copy the element</button>
            <button onClick={handleVisible}>
              {isVisible ? "Hide the element" : "Show the element"}
            </button>
            <button onClick={handleRemove}>Remove the element</button>
          </div>
        )}

        {isShapeBarOpen && <ShapeBar parent={item} />}
      </div>

      {isExpanded && children}
    </>
  );
}
