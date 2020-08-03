import React, { useState } from "react";
import styles from "./Login.module.css";
import { Link } from "react-router-dom";
import axios from "axios";

import Header from "../Common/Header/Header";

const Login = ({ changeAuthStatus }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleStatusChange = () => {
    console.log("In Login");
    changeAuthStatus();
  };

  const handleEmail = (emailId) => {
    setEmail(emailId);
  };
  const handlePassword = (Password) => {
    setPassword(Password);
  };
  let errorMessage = document.getElementsByClassName("errorMessage");
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/user/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        handleStatusChange();
        localStorage.setItem("auth-token", res.data.token);
      })
      .catch((err) => {
        console.log(err.data);
        errorMessage.innerHTML = `<p>${err}</p>`;
      });
  };

  return (
    <div className={styles.mainContainer}>
      <Header />
      <div className={styles.container}>
        <div className={styles.loginCard}>
          <h1>Login</h1>
          <div className={styles.errorMessage}></div>
          <form onSubmit={(e) => handleSubmit(e)}>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Enter Email"
              autoComplete="off"
              required
              onChange={(e) => handleEmail(e.target.value)}
            />
            <label htmlFor="password">Password</label>
            <input
              type="text"
              name="password"
              id="password"
              placeholder="Enter Password"
              autoComplete="off"
              required
              onChange={(e) => handlePassword(e.target.value)}
            />
            <button type="submit">Login</button>
          </form>
          <Link to="/signin">Don't have an Account? Signin for Free!</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
