import { createStore, combineReducers } from "redux";
import illoReducer from "./redusers/illoReducer";
import layerReducer from "./redusers/layerReducer";
import pathReducer from "./redusers/pathReducer";
import { shapeReducer, selectedShapesReducer } from "./redusers/shapeReducer";

const rootReduser = combineReducers({
  illo: illoReducer,
  layers: layerReducer,
  shape: shapeReducer,
  selectedShapes: selectedShapesReducer,
  path: pathReducer,
});

export const store = createStore(rootReduser);
