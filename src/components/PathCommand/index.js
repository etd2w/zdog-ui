import InputText from "../InputText";

export default function PathCommand({ type, index }) {
  const changeProperty = () => {};

  return (
    <div>
      <span>{type}</span>
      {/* {["x", "y", "z"].map(axis => (
        <InputText
          callback={changeProperty}
          options={{ object: ["shape", "path", index, "line", axis] }}
        />
        ))} */}
      <InputText
        callback={changeProperty}
        options={{ object: ["shape", "path", 1, "line", "y"], label: "y" }}
      />
      <InputText
        callback={changeProperty}
        options={{ object: ["shape", "path", 1, "line", "z"], label: "z" }}
      />
    </div>
  );
}
