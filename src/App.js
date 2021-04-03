import Canvas from "./components/Canvas";
import ListOfLayers from "./components/ListOfLayers";
import ShapeProps from "./components/ShapeProps";

function App() {
  return (
    <div className="app">
      <main>
        <ListOfLayers />
        <Canvas />
        <ShapeProps />
      </main>
    </div>
  );
}

export default App;
