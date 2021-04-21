import { useDispatch, useSelector } from "react-redux";
import { useContextMenu } from "../../hooks";
import InputText from "../InputText";
import PathBar from "../PathBar";
import styles from "./style.module.css";
import table from "../../styles/table.module.css";
import { Table, TableRow } from "../../ui/Table/Table";

export default function PathTable({ children }) {
  const [isContextMenuOpen, setIsContextMenuOpen] = useContextMenu(false);
  const shape = useSelector(state => state.shape);
  const path = useSelector(state => state.path);
  const dispatch = useDispatch();

  const changeProperty = (value, slicePath) => {
    if (slicePath[3] === "arc" || slicePath[3] === "bezier") {
      shape.path[slicePath[2]][slicePath[3]][slicePath[4]][
        slicePath[5]
      ] = parseFloat(value);
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

  return (
    <Table name="Path">
      {shape.type === "Shape" &&
        path.map((pathMethod, i) => {
          if (pathMethod === "arc" || pathMethod === "bezier") {
            return (
              <>
                <TableRow label={pathMethod}>
                  {["x", "y", "z"].map(axis => (
                    <InputText
                      callback={changeProperty}
                      slicePath={["shape", "path", i, pathMethod, 0, axis]}
                      label={axis}
                      key={axis}
                    />
                  ))}
                  {path.length !== 1 && (
                    <button
                      className={styles.button}
                      onClick={() => removePath(i)}
                    >
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

                  {["x", "y", "z"].map(axis => (
                    <InputText
                      callback={changeProperty}
                      slicePath={["shape", "path", i, pathMethod, 1, axis]}
                      label={axis}
                      key={axis}
                    />
                  ))}

                  {pathMethod === "bezier" &&
                    ["x", "y", "z"].map(axis => (
                      <InputText
                        callback={changeProperty}
                        slicePath={["shape", "path", i, pathMethod, 2, axis]}
                        label={axis}
                        key={axis}
                      />
                    ))}
                </TableRow>
              </>
            );
          }
          return (
            <TableRow label={pathMethod}>
              {["x", "y", "z"].map(axis => (
                <InputText
                  callback={changeProperty}
                  slicePath={["shape", "path", i, pathMethod, axis]}
                  label={axis.toUpperCase()}
                  key={axis}
                />
              ))}
              {path.length !== 1 && (
                <button className={styles.button} onClick={() => removePath(i)}>
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
            </TableRow>
            // <tr className={table.tr} key={i}>
            //   <td className={table.td}>
            //   </td>
            // </tr>
          );
        })}
    </Table>
  );
}
// {/* <thead className={table.thead}>
//   <tr>
//     <th className={table.th}>
//       Path
//       {shape.type === "Shape" && (
//         <button
//           onClick={() => setIsContextMenuOpen(!isContextMenuOpen)}
//           className={styles.button}
//         >
//           <svg
//             width="9"
//             height="9"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               d="M8.036 0H.964A.965.965 0 000 .964v7.072C0 8.568.432 9 .964 9h7.072A.965.965 0 009 8.036V.964A.965.965 0 008.036 0zm-.643 5.063a.242.242 0 01-.241.24H5.304v1.849a.242.242 0 01-.242.24H3.938a.242.242 0 01-.24-.24V5.304H1.847a.242.242 0 01-.24-.242V3.938c0-.132.108-.24.24-.24h1.848V1.847c0-.132.109-.24.241-.24h1.126c.132 0 .24.108.24.24v1.848h1.849c.132 0 .24.109.24.241v1.126z"
//               fill="#fff"
//             />
//           </svg>
//           <span>Add</span>
//         </button>
//       )}
//       {isContextMenuOpen && <PathBar />}
//     </th>
//   </tr>
// </thead>
// <tbody className={table.tbody}>
//   {children}

// </tbody> */}
