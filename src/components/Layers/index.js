import { useSelector } from "react-redux";
import Layer from "../Layer";
import LayoutBlock from "../LayoutBlock";

export default function Layers() {
  const layers = useSelector(state => state.layers);

  return (
    <LayoutBlock title="Elements">
      <div>
        {layers.map(layer => (
          <Layer item={layer} key={layer.id} id={layer.id} />
        ))}
      </div>
    </LayoutBlock>
  );
}
