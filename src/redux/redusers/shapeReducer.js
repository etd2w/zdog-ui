export function shapeReducer(state = {}, action) {
  const { type, payload } = action;

  switch (type) {
    case "SHAPE_SELECTED":
      if (payload.shiftKey === undefined) {
        return payload;
      }
      return payload.shape;
    default:
      return state;
  }
}

export function selectedShapesReducer(state = [], action) {
  const { type, payload } = action;

  switch (type) {
    case "SHAPE_SELECTED":
      if (payload.shiftKey) {
        return [...state, payload.shape.id];
      } else if (payload.shiftKey === undefined) {
        return [payload.id];
      }
      return [payload.shape.id];
    default:
      return state;
  }
}
