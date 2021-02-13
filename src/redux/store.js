import { createStore, combineReducers } from "redux";
import illoReducer from "./redusers/illoReducer";
import layerReducer from "./redusers/layerReducer";

const rootReduser = combineReducers({
  illo: illoReducer,
  layers: layerReducer,
});

export const store = createStore(rootReduser);
