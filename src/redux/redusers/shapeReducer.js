export default function shapeReducer(state = {}, action) {
  const { type, payload } = action;

  switch (type) {
    case "SELECT_SHAPE":
      return payload;
    case "CHANGE_SHAPE":
      return state;
    default:
      return state;
  }
}
