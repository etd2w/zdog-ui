import Canvas from "./components/Canvas";
import Layers from "./components/Layers";

function App() {
  return (
    <div className="app">
      <div className="container">
        <Layers />
        <Canvas />
      </div>
    </div>
  );
}

export default App;
