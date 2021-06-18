import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputText, { Label } from "../InputText";
import Dropdown from "../Dropdown";

const pathTypes = ["line", "move", "arc", "bezier"];

export default function PathTable({ children }) {
  const shape = useSelector(state => state.shape);
  const path = useSelector(state => state.path);
  const dispatch = useDispatch();

  const changeProperty = (value, slicePath) => {
    if (slicePath[3] === "arc" || slicePath[3] === "bezier") {
      shape.path[slicePath[2]][slicePath[3]][slicePath[4]][slicePath[5]] =
        parseFloat(value);
    } else {
      shape.path[slicePath[2]][slicePath[3]][slicePath[4]] = parseFloat(value);
    }
    shape.updatePath();
  };

  const removePath = id => {
    shape.path.splice(id, 1);
    dispatch({ type: "PATH_REMOVED", payload: shape });
    shape.updatePath();
  };

  const createPath = type => {
    if (type === "line" || type === "move") {
      shape.path.push({ [type]: { x: 0, y: 0, z: 0 } });
    } else if (type === "arc") {
      shape.path.push({
        [type]: [
          { x: 0, y: 0, z: 0 },
          { x: 0, y: 0, z: 0 },
        ],
      });
    } else {
      shape.path.push({
        [type]: [
          { x: 0, y: 0, z: 0 },
          { x: 0, y: 0, z: 0 },
          { x: 0, y: 0, z: 0 },
        ],
      });
    }

    dispatch({ type: "PATH_ADDED", payload: type });

    shape.updatePath();
    shape.updatePathCommands();
  };

  return (
    <>
      <thead>
        <tr>
          <th scope="col">Path</th>
          <th scope="col">
            {shape.type === "Shape" ? (
              <Dropdown content={pathTypes} onSelect={createPath}>
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
                <span>Add</span>
              </Dropdown>
            ) : null}
            {/* {shape.type === "Shape" && (
              <button onClick={() => setIsContextMenuOpen(!isContextMenuOpen)}>
                <svg
                  width="9"
                  height="9"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.036 0H.964A.965.965 0 000 .964v7.072C0 8.568.432 9 .964 9h7.072A.965.965 0 009 8.036V.964A.965.965 0 008.036 0zm-.643 5.063a.242.242 0 01-.241.24H5.304v1.849a.242.242 0 01-.242.24H3.938a.242.242 0 01-.24-.24V5.304H1.847a.242.242 0 01-.24-.242V3.938c0-.132.108-.24.24-.24h1.848V1.847c0-.132.109-.24.241-.24h1.126c.132 0 .24.108.24.24v1.848h1.849c.132 0 .24.109.24.241v1.126z"
                    fill="#fff"
                  />
                </svg>
                <span>Add</span>
              </button>
            )}
            {isContextMenuOpen && <PathBar />} */}
          </th>
        </tr>
      </thead>
      <tbody>
        {children}
        {shape.type === "Shape" &&
          path.map((pathMethod, i) => {
            if (pathMethod === "arc" || pathMethod === "bezier") {
              return (
                <Fragment key={i}>
                  <tr key={i}>
                    <td>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        {pathMethod}
                        {path.length !== 1 && i !== 0 && (
                          <button onClick={() => removePath(i)}>
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
                        )}
                      </div>
                    </td>
                    <td>
                      {["x", "y", "z"].map(axis => (
                        <Fragment key={axis}>
                          <Label
                            slicePath={[
                              "shape",
                              "path",
                              i,
                              pathMethod,
                              0,
                              axis,
                            ]}
                            id={`${pathMethod}${i}${axis}`}
                          >
                            {axis.toUpperCase()}
                          </Label>
                          <InputText
                            callback={changeProperty}
                            slicePath={[
                              "shape",
                              "path",
                              i,
                              pathMethod,
                              0,
                              axis,
                            ]}
                            id={`${pathMethod}${i}${axis}`}
                          />
                        </Fragment>
                      ))}
                    </td>
                  </tr>
                  <tr>
                    <td></td>
                    <td>
                      {["x", "y", "z"].map(axis => (
                        <Fragment key={axis}>
                          <Label
                            slicePath={[
                              "shape",
                              "path",
                              i,
                              pathMethod,
                              1,
                              axis,
                            ]}
                            id={`${pathMethod}${i}${axis}${i}`}
                          >
                            {axis.toUpperCase()}
                          </Label>
                          <InputText
                            callback={changeProperty}
                            slicePath={[
                              "shape",
                              "path",
                              i,
                              pathMethod,
                              1,
                              axis,
                            ]}
                            id={`${pathMethod}${i}${axis}${i}`}
                          />
                        </Fragment>
                      ))}
                    </td>
                  </tr>

                  {pathMethod === "bezier" && (
                    <tr>
                      <td></td>
                      <td>
                        {["x", "y", "z"].map(axis => (
                          <Fragment key={axis}>
                            <Label
                              slicePath={[
                                "shape",
                                "path",
                                i,
                                pathMethod,
                                2,
                                axis,
                              ]}
                              id={`${pathMethod}${i}${axis}${i}`}
                            >
                              {axis.toUpperCase()}
                            </Label>
                            <InputText
                              callback={changeProperty}
                              slicePath={[
                                "shape",
                                "path",
                                i,
                                pathMethod,
                                2,
                                axis,
                              ]}
                              id={`${pathMethod}${i}${axis}${3}`}
                            />
                          </Fragment>
                        ))}
                      </td>
                    </tr>
                  )}
                </Fragment>
              );
            }
            return (
              <tr key={i}>
                <td>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    {pathMethod}
                    {path.length !== 1 && i !== 0 && (
                      <button onClick={() => removePath(i)}>
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
                    )}
                  </div>
                </td>
                <td>
                  {["x", "y", "z"].map(axis => (
                    <Fragment key={axis}>
                      <Label
                        slicePath={["shape", "path", i, pathMethod, axis]}
                        id={`${pathMethod}${i}${axis}`}
                      >
                        {axis.toUpperCase()}
                      </Label>
                      <InputText
                        callback={changeProperty}
                        slicePath={["shape", "path", i, pathMethod, axis]}
                        id={`${pathMethod}${i}${axis}`}
                      />
                    </Fragment>
                  ))}
                </td>
              </tr>
            );
          })}
      </tbody>
    </>
  );
}
