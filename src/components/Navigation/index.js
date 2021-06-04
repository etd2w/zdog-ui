import { Link } from "react-router-dom";
import styles from "./style.module.css";
import { v4 as uuid } from "uuid";

export default function Navigation() {
  const handleClick = () => {
    const newBlob = new Blob([localStorage.getItem("illo")], {
      type: "text/javascript",
    });

    const url = URL.createObjectURL(newBlob);

    var a = document.createElement("a");
    a.download = "zModel.js";
    a.href = url;
    a.click();
  };

  const handleImport = event => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.addEventListener("load", event => {
      var obj = JSON.parse(event.target.result);
      obj.id = uuid();
      localStorage.setItem(`${obj.id}`, JSON.stringify(obj));
    });

    reader.readAsText(file);

    window.location.reload();
  };

  const handleSelect = event => {
    fetch(`./${event.target.value}.js`).then(response => {
      response.json().then(response => {
        response.id = uuid();
        localStorage.setItem(`${response.id}`, JSON.stringify(response));
        window.location.reload();
      });
    });
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
      <button>Import</button>
      <input type="file" onChange={handleImport} accept=".json, .js" />
      <select name="models" onChange={handleSelect}>
        <option value="">Examples</option>
        <option value="houses">Houses</option>
        <option value="shape">Shape</option>
      </select>
    </div>
  );
}
