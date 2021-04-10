export default function layerReducer(state = [], action) {
  const { type, payload } = action;

  switch (type) {
    case "LAYER_ADDED": {
      return [...state, payload];
    }
    case "LAYER_REMOVED": {
      const newState = [...state];
      if (!payload.addTo.id) newState.splice(newState.indexOf(payload), 1);
      return newState;
    }
    case "LAYER_COPIED": {
      const newState = [...state];
      if (!payload.addTo.id) newState.push(payload);
      return newState;
    }
    default:
      return state;
  }
}
