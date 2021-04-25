export function shapeReducer(state = {}, action) {
  const { type, payload } = action;

  switch (type) {
    case "SHAPE_SELECTED":
      if (payload.shiftKey === undefined) {
        return payload;
      }
      return payload.shape;
    case "SHAPE_CHANGED":
      return state;
    default:
      return state;
  }
}

export function selectedShapesReducer(state = [], action) {
  const { type, payload } = action;

  switch (type) {
    case "SHAPE_SELECTED":
      if (payload.shiftKey) {
        return [...state, payload.shape];
      } else if (payload.shiftKey === undefined) {
        return [payload];
      }
      return [payload.shape];
    default:
      return state;
  }
}
