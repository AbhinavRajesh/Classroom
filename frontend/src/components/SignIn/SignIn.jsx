import React from "react";
import styles from "./SignIn.module.css";
import { Link } from "react-router-dom";

import Header from "../Common/Header/Header";

const SignIn = () => {
  return (
    <div className={styles.mainContainer}>
      <Header />
      <div className={styles.container}>
        <div className={styles.loginCard}>
          <h1>SignIn</h1>
          <form action="http://localhost:8000/signin" method="post">
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" placeholder="Enter Name" />
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter Email"
            />
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Enter Username"
            />
            <label htmlFor="password">Password</label>
            <input
              type="text"
              name="password"
              id="password"
              placeholder="Enter Password"
            />
            <label htmlFor="cpassword">Confirm Password</label>
            <input
              type="text"
              name="cpassword"
              id="cpassword"
              placeholder="Confirm Password"
            />
            <button type="submit">Submit</button>
          </form>
          <Link to="/login">Already have an Account?</Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
