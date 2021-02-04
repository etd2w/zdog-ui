import Layer from "../Layer";
import LayoutBlock from "../LayoutBlock";

export default function Layers() {
  const elements = [
    { type: "Ellipse", id: "001", children: [] },
    { type: "Rect", id: "002", children: [] },
    {
      type: "Anchor",
      id: "003",
      children: [
        { type: "Polygon", id: "004", children: [] },
        {
          type: "Hemisphere",
          id: "005",
          children: [
            { type: "Anchor", id: "006", children: [] },
            { type: "Rect", id: "007", children: [] },
          ],
        },
        { type: "RoundedRect", id: "008", children: [] },
      ],
    },
    { type: "Cone", id: "009", children: [] },
  ];

  return (
    <LayoutBlock title="Elements">
      <div>
        {elements.map(element => (
          <Layer item={element} key={element.id} />
        ))}
      </div>
    </LayoutBlock>
  );
}
