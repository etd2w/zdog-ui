import { useSelector } from "react-redux";
import { useContextMenu } from "../../hooks";
import Layer from "../Layer/layer";
import ShapeBar from "../ShapeBar";
import styles from "./listOfLayers.module.css";
import Section from "../../ui/Section/Section";

export default function ListOfLayers() {
  const [isContextMenuOpen, setIsContextMenuOpen] = useContextMenu(false);
  const layers = useSelector(state => state.layers);

  const header = (
    <>
      <button
        onClick={() => setIsContextMenuOpen(!isContextMenuOpen)}
        className={styles.button}
      >
        <svg
          width="9"
          height="9"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.036 0H.964A.965.965 0 000 .964v7.072C0 8.568.432 9 .964 9h7.072A.965.965 0 009 8.036V.964A.965.965 0 008.036 0zm-.643 5.063a.242.242 0 01-.241.24H5.304v1.849a.242.242 0 01-.242.24H3.938a.242.242 0 01-.24-.24V5.304H1.847a.242.242 0 01-.24-.242V3.938c0-.132.108-.24.24-.24h1.848V1.847c0-.132.109-.24.241-.24h1.126c.132 0 .24.108.24.24v1.848h1.849c.132 0 .24.109.24.241v1.126z"
            fill="#fff"
          />
        </svg>
        <span>Add</span>
      </button>
      {isContextMenuOpen && <ShapeBar />}
    </>
  );

  return (
    <Section title="Components" header={header} className={styles.listOfLayers}>
      <ul className="stack">
        {layers.map(layer => (
          <Layer layer={layer} key={layer.id} id={layer.id} />
        ))}
      </ul>
    </Section>

    // <section className="stack">
    //   <header className={section.header}>
    //     Components
    //     <button
    //       onClick={() => setIsContextMenuOpen(!isContextMenuOpen)}
    //       className={styles.button}
    //     >
    //       <svg
    //         width="9"
    //         height="9"
    //         fill="none"
    //         xmlns="http://www.w3.org/2000/svg"
    //       >
    //         <path
    //           d="M8.036 0H.964A.965.965 0 000 .964v7.072C0 8.568.432 9 .964 9h7.072A.965.965 0 009 8.036V.964A.965.965 0 008.036 0zm-.643 5.063a.242.242 0 01-.241.24H5.304v1.849a.242.242 0 01-.242.24H3.938a.242.242 0 01-.24-.24V5.304H1.847a.242.242 0 01-.24-.242V3.938c0-.132.108-.24.24-.24h1.848V1.847c0-.132.109-.24.241-.24h1.126c.132 0 .24.108.24.24v1.848h1.849c.132 0 .24.109.24.241v1.126z"
    //           fill="#fff"
    //         />
    //       </svg>
    //       <span>Add</span>
    //     </button>
    //     {isContextMenuOpen && <ShapeBar />}
    //   </header>

    //   <article className={section.article}>
    //     <ul className={styles.list}>
    //       {layers.map(layer => (
    //         <Layer layer={layer} key={layer.id} id={layer.id} />
    //       ))}
    //     </ul>
    //   </article>
    // </section>
  );
}
