import { createStore, combineReducers } from "redux";
import illoReducer from "./redusers/illoReducer";
import layerReducer from "./redusers/layerReducer";
import { shapeReducer, selectedShapesReducer } from "./redusers/shapeReducer";

const rootReduser = combineReducers({
  illo: illoReducer,
  layers: layerReducer,
  shape: shapeReducer,
  selectedShapes: selectedShapesReducer,
});

export const store = createStore(rootReduser);
