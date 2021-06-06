import { Link } from "react-router-dom";
import styles from "./style.module.css";
import createCanvas from "../../utils";
import { useDispatch } from "react-redux";

export default function Navigation() {
  const dispatch = useDispatch();

  const handleSelect = event => {
    if (event.target.value) {
      fetch(`./${event.target.value}.js`).then(response => {
        response.json().then(response => {
          dispatch({
            type: "ILLO_CREATED",
            payload: createCanvas(".canvas", {}, response),
          });
        });
      });
    } else {
      dispatch({
        type: "ILLO_CREATED",
        payload: createCanvas(".canvas", {}),
      });
    }
  };

  return (
    <div className={styles.nav}>
      <span>
        <Link to="/">ZDOGUI</Link>
      </span>

      <nav>
        <ul>
          <li>
            <Link to="/explore">Explore</Link>
          </li>
        </ul>
      </nav>

      <button onClick={() => localStorage.clear()}>Clear localStorage</button>
      <select name="models" onChange={handleSelect}>
        <option value="">Examples</option>
        <option value="houses">Houses</option>
        <option value="shape">Shape</option>
      </select>
    </div>
  );
}
