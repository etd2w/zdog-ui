export default function pathReducer(state = [], action) {
  const { type, payload } = action;

  switch (type) {
    case "SHAPE_SELECTED":
      if (payload.type !== "Shape") return state;
      if (payload.shiftKey === undefined) {
        return payload.path?.map(path => Object.keys(path)[0]);
      }
      return payload.shape.path?.map(path => Object.keys(path)[0]);
    case "PATH_ADDED":
      return [...state, action.payload];
    case "PATH_REMOVED":
      return payload.path?.map(path => Object.keys(path)[0]);
    default:
      return state;
  }
}
