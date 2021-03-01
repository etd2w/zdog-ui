import Canvas from "./components/Canvas";
import Layers from "./components/Layers";
import ShapeProps from "./components/ShapeProps";

function App() {
  return (
    <div className="app">
      <div className="container">
        <Layers />
        <Canvas />
        <ShapeProps />
      </div>
    </div>
  );
}

export default App;
