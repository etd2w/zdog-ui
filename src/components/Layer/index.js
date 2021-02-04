import { useEffect, useState } from "react";
import styles from "./style.module.css";

export default function Layer({ item }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  let children = null;

  if (item.children.length) {
    children = (
      <div className={styles.child}>
        {item.children.map(child => (
          <Layer item={child} key={child.id} />
        ))}
      </div>
    );
  }

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleOpenMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener("click", handleOpenMenu);
    }
    return () => {
      document.removeEventListener("click", handleOpenMenu);
    };
  }, [isMenuOpen]);

  return (
    <>
      <div className={styles.layer}>
        <div
          className={item.children.length ? styles.leftHalf : styles.leftPad}
        >
          {item.children.length > 0 && (
            <button className={styles.btnExpand} onClick={handleExpand}>
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
          <span>{item.type}</span>
        </div>

        <div className={styles.rightHelf}>
          <button className={styles.btnMenu} onClick={handleOpenMenu}>
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

          <button className={styles.btnAdd}>
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

        {isMenuOpen && (
          <div className={styles.layerMenu}>
            <button>Copy the element</button>
            <button>Hide the element</button>
            <button>Remove the element</button>
          </div>
        )}
      </div>

      {isExpanded && children}
    </>
  );
}
