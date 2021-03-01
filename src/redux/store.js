import { createStore, combineReducers } from "redux";
import illoReducer from "./redusers/illoReducer";
import layerReducer from "./redusers/layerReducer";
import shapeReducer from "./redusers/shapeReducer";

const rootReduser = combineReducers({
  illo: illoReducer,
  layers: layerReducer,
  shape: shapeReducer,
});

export const store = createStore(rootReduser);
