export default function layerReducer(state = [], action) {
  const { type, payload } = action;

  switch (type) {
    case "ILLO_CREATED": {
      return [...payload.children];
    }
    case "LAYER_ADDED": {
      if (payload.addTo.id) return state;
      return [...state, payload];
    }
    case "LAYER_REMOVED": {
      const newState = [...state];
      if (!payload.addTo.id) newState.splice(newState.indexOf(payload), 1);
      return newState;
    }
    default:
      return state;
  }
}
