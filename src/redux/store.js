import { createStore, combineReducers } from "redux";
import illoReducer from "./redusers/illoReducer";
import layerReducer from "./redusers/layerReducer";
import shapeReducer from "./redusers/shapeReducer";
import pathReducer from "./redusers/pathReducer";

const rootReduser = combineReducers({
  illo: illoReducer,
  layers: layerReducer,
  shape: shapeReducer,
  path: pathReducer,
});

export const store = createStore(rootReduser);
