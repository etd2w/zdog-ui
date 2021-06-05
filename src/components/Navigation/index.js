import { Link } from "react-router-dom";
import styles from "./style.module.css";
import { v4 as uuid } from "uuid";
import createCanvas from "../../utils";
import { useDispatch, useSelector } from "react-redux";

export default function Navigation() {
  const illo = useSelector(state => state.illo);
  const dispatch = useDispatch();

  const handleClick = () => {
    const newBlob = new Blob([localStorage.getItem("illo")], {
      type: "text/javascript",
    });

    const url = URL.createObjectURL(newBlob);

    const a = document.createElement("a");
    a.download = "zModel.js";
    a.href = url;
    a.click();
  };

  const handleImport = event => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.addEventListener("load", event => {
      const obj = JSON.parse(event.target.result);
      obj.id = uuid();
      localStorage.setItem(`${obj.id}`, JSON.stringify(obj));
    });

    reader.readAsText(file);

    window.location.reload();
  };

  const handleSelect = event => {
    if (event.target.value) {
      fetch(`./${event.target.value}.js`).then(response => {
        response.json().then(response => {
          response.id = uuid();
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

  const saveIlloToLocalStorage = () => {
    localStorage.setItem(`${illo.id}`, JSON.stringify(illo));
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

      <button onClick={handleClick}>Export</button>
      <button onClick={saveIlloToLocalStorage}>Save to localStorage</button>
      <input type="file" onChange={handleImport} accept=".json, .js" />
      <select name="models" onChange={handleSelect}>
        <option value="">Examples</option>
        <option value="houses">Houses</option>
        <option value="shape">Shape</option>
      </select>
    </div>
  );
}
