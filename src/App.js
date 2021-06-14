import { Route } from "react-router";
import Canvas from "./layout/Scene";
import ListOfLayers from "./layout/Explorer";
import ShapeProps from "./layout/Inspector";
import Explore from "./pages/Explore";
import Landing from "./pages/Landing";

function App() {
  return (
    <>
      <Route exact path="/p/">
        <main className="switcher">
          <div>
            <ListOfLayers />
            <Canvas />
            <ShapeProps />
          </div>
        </main>
      </Route>
      <Route path="/p/:uuid">
        <main className="switcher">
          <div>
            <ListOfLayers />
            <Canvas />
            <ShapeProps />
          </div>
        </main>
      </Route>
      <Route exact path="/">
        <Landing />
      </Route>
      <Route path="/explore">
        <Explore />
      </Route>
    </>
  );
}

export default App;
