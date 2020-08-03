import React from "react";
import styles from "./Home.module.css";
import { Link } from "react-router-dom";

import Header from "../Common/Header/Header";
import Image from "../../assets/Home-Image.svg";

const Home = () => {
  return (
    <div className={styles.mainContainer}>
      <Header />
      <div className={styles.container}>
        <div className={styles.text}>
          <h1>
            Join or Create New Class And Share Notes and Submit Assignments!
          </h1>
          <div className={styles.links}>
            <Link to="/login" className={styles.callTo}>
              Login
            </Link>
            <Link to="/signin">Don't have an account? Signin Now!</Link>
          </div>
        </div>
        <div className={styles.image}>
          <img src={Image} alt="Studying" />
        </div>
      </div>
    </div>
  );
};

export default Home;
