export default function pathReducer(state = ["line"], action) {
  switch (action.type) {
    case "SHAPE_ADDED":
      console.log(action.payload.map(path => Object.keys(path)[0]));
      return [...action.payload.map(path => Object.keys(path)[0])];
    case "PATH_ADDED":
      console.log(state);
      return [...state, action.payload];
    default:
      return state;
  }
}
