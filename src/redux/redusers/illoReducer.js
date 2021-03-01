// export default function illoReducer(state = { illustration: {} }, action) {
//   const { type, payload } = action;

//   switch (type) {
//     case "CREATE_ILLO":
//       return { illustration: payload };
//     case "CHANGE_ILLO":
//       return { ...state };
//     default:
//       return state;
//   }
// }
export default function illoReducer(state = {}, action) {
  const { type, payload } = action;

  switch (type) {
    case "CREATE_ILLO":
      return payload;
    case "CHANGE_ILLO":
      return state;
    default:
      return state;
  }
}
