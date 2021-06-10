import { Route } from "react-router";
import Canvas from "./components/Canvas";
import ListOfLayers from "./components/ListOfLayers/ListOfLayers";
import ShapeProps from "./components/ShapeProps";
import Explore from "./pages/Explore";
import Landing from "./pages/Landing";

function App() {
  return (
    <>
      <Route path="/app">
        <main className="switcher">
          <div>
            <ListOfLayers />
            <Canvas />
            <ShapeProps />
          </div>
        </main>
      </Route>
      <Route path="/" exact>
        <Landing />
      </Route>
      <Route path="/explore">
        <Explore />
      </Route>
    </>
  );
}

export default App;
