import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Illustration } from "zdog";
import CanvasSettings from "./CanvasSettings";
import section from "../../styles/section.module.css";

export default function Canvas() {
  const dispatch = useDispatch();
  const illo = useSelector(state => state.illo);

  useEffect(() => {
    dispatch({
      type: "CREATE_ILLO",
      payload: new Illustration({
        element: ".canvas",
        dragRotate: true,
        onDragMove: () => {
          dispatch({ type: "CHANGE_ILLO" });
        },
      }),
    });
  }, [dispatch]);

  useEffect(() => {
    if (illo) {
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
    <section className={section.canvas}>
      <header className={section.header}>Canvas</header>

      <article className={section.article}>
        <canvas className="canvas" height={417} width={568} />

        {/* {illo && <CanvasSettings />} */}
      </article>
    </section>
  );
}
