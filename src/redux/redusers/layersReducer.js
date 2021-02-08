export default function layersReducer(state = [], action) {
  switch (action.type) {
    case "ADD_LAYER":
      return [...state, action.payload];
    case "REMOVE_LAYER":
      const newState = [...state];
      newState.splice(newState.indexOf(action.payload), 1);
      return newState;
    default:
      return state;
  }
}
