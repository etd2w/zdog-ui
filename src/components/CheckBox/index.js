import { useState } from "react";
import { useSelector } from "react-redux";
import CheckBoxUI from "../../ui/CheckBox/CheckBox";

export default function CheckBox({ callback, slicePath, label }) {
  const selectSlice = useSelector(state => {
    let slice = state;

    slicePath.forEach(property => {
      slice = slice[property];
    });

    return slice;
  });

  const [checked, setChecked] = useState(Boolean(selectSlice));

  const handleChange = () => {
    setChecked(!checked);
    callback(slicePath[slicePath.length - 1]);
  };

  return (
    <>
      {label && <span>{label}</span>}

      <CheckBoxUI state={Boolean(selectSlice)} onChange={handleChange} />
    </>
  );
}
