export default function illoReducer(state = null, action) {
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
