import React from "react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div className={styles.logo}>
        <h1>AR-Classroom</h1>
      </div>
      <nav>
        <ul className={styles.navLinks}>
          <Link to="/">
            <li className={styles.navLink}>Home</li>
          </Link>
          <Link to="/login">
            <li className={styles.navLink}>Login</li>
          </Link>
          <Link to="/signin">
            <li className={styles.navLink}>SignUp</li>
          </Link>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
