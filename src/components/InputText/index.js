import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./style.module.css";

export default function InputText({ callback, slicePath, id }) {
  const dispatch = useDispatch();
  const selectSlice = useSelector(state => {
    let slice = state;

    slicePath.forEach(property => {
      slice = slice[property];
    });

    return slice;
  });

  const [value, setValue] = useState(() => {
    if (typeof selectSlice !== "number") return;

    if (slicePath[slicePath.length - 2] === "rotate") {
      return Math.round(selectSlice * (180 / Math.PI));
    } else return selectSlice;
  });

  const inputRef = useRef();

  useEffect(() => {
    if (typeof selectSlice !== "number") return;

    if (slicePath[slicePath.length - 2] === "rotate") {
      setValue(Math.round(selectSlice * (180 / Math.PI)));
    } else {
      setValue(selectSlice);
    }
  }, [selectSlice, slicePath]);

  const applyChange = event => {
    const { target, key, type } = event;
    if (key === "Enter" || type === "blur") {
      const vector = slicePath[slicePath.length - 2];
      const property = slicePath[slicePath.length - 1];
      if (slicePath[1] === "path") {
        callback(parseFloat(target.value), slicePath);
      } else {
        callback(parseFloat(target.value), property, vector);
      }
      dispatch({ type: "SHAPE_CHANGED" });
    }
  };

  const handleChange = ({ target }) => {
    setValue(target.value);
  };

  return (
    <div className={`${styles.inputText}`}>
      <input
        id={id}
        ref={inputRef}
        type="text"
        value={value}
        onChange={handleChange}
        onFocus={({ target }) => target.select()}
        onBlur={applyChange}
        onKeyPress={applyChange}
      />
    </div>
  );
}

export function Label({ id, children, slicePath }) {
  const element = useSelector(state => state[slicePath[0]]);
  const selectSlice = useSelector(state => {
    let slice = state;

    slicePath.forEach(property => {
      slice = slice[property];
    });

    return slice;
  });

  const [value, setValue] = useState(() => {
    if (typeof selectSlice !== "number") return;

    if (slicePath[slicePath.length - 2] === "rotate") {
      return Math.round(selectSlice * (180 / Math.PI));
    } else return selectSlice;
  });

  useEffect(() => {
    if (typeof selectSlice !== "number") return;

    if (slicePath[slicePath.length - 2] === "rotate") {
      setValue(Math.round(selectSlice * (180 / Math.PI)));
    } else {
      setValue(selectSlice);
    }
  }, [selectSlice, slicePath]);

  const handleMouseDown = event => {
    const input = document.getElementById(id);
    const startCoordinate = event.clientX;
    let mouseMoveListener;

    const mouseUpListener = () => {
      document.removeEventListener("mousemove", mouseMoveListener);
    };

    mouseMoveListener = event => {
      const currentCoordinate = event.clientX;
      input.value = value + currentCoordinate - startCoordinate;
      setValue(value + currentCoordinate - startCoordinate);

      if (slicePath[slicePath.length - 2] === "rotate") {
        element[slicePath[slicePath.length - 2]][
          slicePath[slicePath.length - 1]
        ] = ((value + currentCoordinate - startCoordinate) * Math.PI) / 180;
      } else if (
        slicePath[slicePath.length - 2] !== "shape" &&
        slicePath[1] !== "path"
      ) {
        element[slicePath[slicePath.length - 2]][
          slicePath[slicePath.length - 1]
        ] = value + currentCoordinate - startCoordinate;
      } else if (slicePath[1] === "path" && typeof slicePath[4] !== "number") {
        element.path[slicePath[2]][slicePath[3]][slicePath[4]] =
          value + currentCoordinate - startCoordinate;
      } else if (slicePath[1] === "path" && typeof slicePath[4] === "number") {
        element.path[slicePath[2]][slicePath[3]][slicePath[4]][slicePath[5]] =
          value + currentCoordinate - startCoordinate;
      } else {
        element[slicePath[slicePath.length - 1]] =
          value + currentCoordinate - startCoordinate;
      }

      if (element.updatePath) {
        element.updatePath();
      }
    };

    document.addEventListener("mousemove", mouseMoveListener);
    document.addEventListener("mouseup", mouseUpListener);
  };

  return (
    <label htmlFor={id} onMouseDown={handleMouseDown} className={styles.label}>
      {children}
    </label>
  );
}
