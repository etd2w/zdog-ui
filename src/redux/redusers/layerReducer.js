export default function layerReducer(state = [], action) {
  const { type, payload } = action;

  switch (type) {
    case "ADD_LAYER": {
      return [...state, payload];
    }
    case "REMOVE_LAYER": {
      const newState = [...state];
      if (!payload.addTo.id) newState.splice(newState.indexOf(payload), 1);
      return newState;
    }
    case "COPY_LAYER": {
      const newState = [...state];
      if (!payload.addTo.id) newState.push(payload);
      return newState;
    }
    default:
      return state;
  }
}
