import Canvas from "./components/Canvas";
import ListOfLayers from "./components/ListOfLayers/ListOfLayers";
import ShapeProps from "./components/ShapeProps";

function App() {
  return (
    <main className="switcher">
      <div>
        <ListOfLayers />
        <Canvas />
        <ShapeProps />
      </div>
    </main>
  );
}

export default App;
