import Canvas from "./components/Canvas";
import ListOfLayers from "./components/ListOfLayers";
import ShapeProps from "./components/ShapeProps";
import Path from "./components/Path";

function App() {
  return (
    <div className="app">
      <div className="container">
        <ListOfLayers />
        <Canvas />
        <div>
          <ShapeProps />
          <Path />
        </div>
      </div>
    </div>
  );
}

export default App;
