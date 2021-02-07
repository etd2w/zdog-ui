export default function illoReducer(state = {}, action) {
  const { type, payload } = action;

  switch (type) {
    case "CREATE_ILLO":
      return payload;
    default:
      return state;
  }
}
