export default function illoReducer(state = null, action) {
  const { type, payload } = action;

  switch (type) {
    case "ILLO_CREATED":
      return payload;
    case "ILLO_CHANGED":
      return state;
    default:
      return state;
  }
}
