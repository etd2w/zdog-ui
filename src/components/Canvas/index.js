import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Zdog from "zdog";
import CanvasSettings from "./CanvasSettings";
import styles from "./style.module.css";
import Section from "../../ui/Section/Section";

const revive = child => {
  const newChild = new Zdog[child.type]({ ...child });
  newChild.id = child.id;
  newChild.name = child.name;
  newChild.type = child.type;

  if (child.children) {
    child.children.forEach(item => {
      if (item.id) {
        newChild.addChild(revive(item));
      }
    });
  }

  return newChild;
};

export default function Canvas() {
  const dispatch = useDispatch();
  const illo = useSelector(state => state.illo);

  useEffect(() => {
    if (localStorage.getItem("illo")) {
      const newIllo = new Zdog.Illustration({
        element: ".canvas",
        dragRotate: true,
        centered: true,
        onDragMove: () => {
          dispatch({ type: "ILLO_CHANGED" });
        },
        ...JSON.parse(localStorage.getItem("illo")),
      });

      const children = JSON.parse(localStorage.getItem("illo")).children;

      children.forEach(child => {
        const newChild = revive(child);

        newIllo.addChild(newChild);
        dispatch({ type: "LAYER_ADDED", payload: newChild });
      });

      dispatch({
        type: "ILLO_CREATED",
        payload: newIllo,
      });
    } else {
      const newIllo = new Zdog.Illustration({
        element: ".canvas",
        dragRotate: true,
        onDragMove: () => {
          dispatch({ type: "ILLO_CHANGED" });
        },
      });

      dispatch({
        type: "ILLO_CREATED",
        payload: newIllo,
      });
    }
  }, [dispatch]);

  useEffect(() => {
    if (illo) {
      const width = illo.element.parentNode.getBoundingClientRect().width;
      const height = illo.element.parentNode.getBoundingClientRect().height - 9;
      illo.setSizeCanvas(width, height);

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
    <Section title="Canvas">
      <div className={styles.container}>
        <canvas className="canvas" />
      </div>
      {illo && <CanvasSettings />}
    </Section>
  );
}
