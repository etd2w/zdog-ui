import { Route } from "react-router";
import Canvas from "./components/Canvas";
import ListOfLayers from "./components/ListOfLayers/ListOfLayers";
import Navigation from "./components/Navigation";
import ShapeProps from "./components/ShapeProps";
import Explore from "./pages/Explore";

function App() {
  return (
    <>
      <Navigation />

      <Route path="/" exact>
        <main className="switcher">
          <div>
            <ListOfLayers />
            <Canvas />
            <ShapeProps />
          </div>
        </main>
      </Route>
      <Route path="/explore">
        <Explore />
      </Route>
    </>
  );
}

export default App;
