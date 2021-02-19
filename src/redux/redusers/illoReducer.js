import { Illustration } from "zdog";

export default function illoReducer(state = {}, action) {
  const { type, payload } = action;

  switch (type) {
    case "CREATE_ILLO":
      const illo = new Illustration({
        element: ".canvas",
        dragRotate: true,
      });
      return illo;
    default:
      return state;
  }
}
