import React from "react";
import { NavLink } from "react-router-dom";
import welcomeImg from "../images/welcome_page.png";
import styles from "./WelcomePage.module.css";

const WelcomePage = () => (
  <section className={styles.container}>
    <div className={styles.sidebar}>
      <h4 className={styles.title}>
        Welcome to <br />
        Todo list
      </h4>
      <p className={styles.description}>
        Our task list provide you to keep all your business in one App. <br />
        Try it now. For free
      </p>
      <NavLink to="/main" activeStyle={styles.button}>
        <button className={styles.button}>Let's get started</button>
      </NavLink>
    </div>

    <div>
      <img
        src={welcomeImg}
        alt="welcome"
        width={400}
        height="auto"
      />
    </div>
  </section>
);

export default WelcomePage;
