import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Illustration } from "zdog";
import LayoutBlock from "../LayoutBlock";

export default function Canvas() {
  const dispatch = useDispatch();
  const illo = useSelector(state => state.illo);

  useEffect(() => {
    dispatch({
      type: "CREATE_ILLO",
      payload: new Illustration({ element: ".canvas", dragRotate: true }),
    });
  }, [dispatch]);

  useEffect(() => {
    if (illo.updateRenderGraph) {
      let requestId;
      const animate = () => {
        illo.updateRenderGraph();
        requestId = requestAnimationFrame(animate);
      };

      animate();

      return () => {
        cancelAnimationFrame(requestId);
      };
    }
  });

  return (
    <LayoutBlock title="canvas">
      <canvas className="canvas" height={417} width={568} />
    </LayoutBlock>
  );
}
