import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Illustration } from "zdog";
// import { Illustration, Group, Ellipse } from "zdog";
import CanvasSettings from "./CanvasSettings";
import styles from "./style.module.css";

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

  // useEffect(() => {
  //   const newIllo = new Illustration({
  //     element: ".canvas",
  //     dragRotate: true,
  //     onDragMove: () => {
  //       dispatch({ type: "CHANGE_ILLO" });
  //     },
  //   });

  //   const zgroup = new Group({
  //     addTo: newIllo,
  //   });

  //   new Ellipse({
  //     addTo: zgroup,
  //     width: 80,
  //     height: 80,
  //     color: "white",
  //     stroke: 20,
  //   });

  //   dispatch({
  //     type: "CREATE_ILLO",
  //     payload: newIllo,
  //   });
  // }, [dispatch]);

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
    <div>
      <div className={styles.header}>
        <span className={styles.title}>Canvas</span>
      </div>

      <div className={styles.contentBlock}>
        <canvas className="canvas" height={417} width={568} />

        {illo && <CanvasSettings />}
      </div>
    </div>
  );
}
