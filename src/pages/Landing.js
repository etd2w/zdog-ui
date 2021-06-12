import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import styles from "./landing.module.css";

export default function Landing() {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main>
        <header className={styles.header}>
          <div className={styles.lead}>
            <h1>
              Oblique is a free, <br /> online <span>pseudo-3D</span> <br />
              modeling app
            </h1>
            <p>
              The most accessible pseudo-3D design platform. No downloads,
              <br /> all in the browser. Free to use for any purpose, forever.
            </p>
            <div className={styles.buttons}>
              <Link className={styles.button} to="/p">
                Create Project
              </Link>
              <button className={styles.button}>Sign Up</button>
            </div>
          </div>
          <div>
            <img src="./canvasImage.png" alt="example" />
            <Link
              className={styles.button}
              to="/p/63c46db8-47d0-4b29-b290-ab73644be745"
            >
              Open In The App
            </Link>
          </div>
        </header>
      </main>
    </div>
  );
}
