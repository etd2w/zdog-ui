import { createStore, combineReducers } from "redux";
import illoReducer from "./redusers/illoReducer";
import layersReducer from "./redusers/layersReducer";

const rootReduser = combineReducers({
  illo: illoReducer,
  layers: layersReducer,
});

export const store = createStore(rootReduser);
