export default function pathReducer(state = ["line"], action) {
  switch (action.type) {
    case "PATH_ADDED":
      return [...state, action.payload];
    default:
      return state;
  }
}
