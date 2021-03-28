import Canvas from "./components/Canvas";
import ListOfLayers from "./components/ListOfLayers";
import ShapeProps from "./components/ShapeProps";

function App() {
  return (
    <div className="app">
      <div className="container">
        <ListOfLayers />
        <Canvas />
        <ShapeProps />
      </div>
    </div>
  );
}

export default App;
