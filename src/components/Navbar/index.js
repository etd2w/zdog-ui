import { NavLink, Link } from "react-router-dom";
import styles from "./style.module.css";

export default function Navbar() {
  // const dispatch = useDispatch();

  // const handleSelect = event => {
  //   if (event.target.value) {
  //     fetch(`./modelExamples/${event.target.value}.js`).then(response => {
  //       response.json().then(response => {
  //         dispatch({
  //           type: "ILLO_CREATED",
  //           payload: createCanvas(".canvas", {}, response),
  //         });
  //       });
  //     });
  //   } else {
  //     dispatch({
  //       type: "ILLO_CREATED",
  //       payload: createCanvas(".canvas", {}),
  //     });
  //   }
  // };

  return (
    <div className={styles.nav}>
      <span>
        <Link className={styles.logo} to="/">
          Oblique
        </Link>
      </span>

      <nav>
        <ul>
          <li>
            <NavLink exact activeClassName={styles.active} to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName={styles.active} to="/explore">
              Explore
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName={styles.active} to="/tutorial">
              Tutorial
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className={styles.buttons}>
        <button>Log In</button>
        <button>Sign Up</button>
      </div>

      {/* <button onClick={() => localStorage.clear()}>Clear localStorage</button>
      <select name="models" onChange={handleSelect}>
        <option value="">Examples</option>
        <option value="houses">Houses</option>
        <option value="shape">Shape</option>
      </select> */}
    </div>
  );
}
