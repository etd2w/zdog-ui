export default function layersReducer(state = [], action) {
  switch (action.type) {
    case "ADD_LAYER":
      return [...state, action.payload];
    default:
      return state;
  }
}
