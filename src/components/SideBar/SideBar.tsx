import React from "react";

import Logo from "../Logo/Logo";

import styles from "./SideBar.module.css";

const SideBar = (): JSX.Element => {
  return (
    <div className={styles.root}>
      <Logo />

      <div style={{ margin: "20px 0", borderTop: "2px solid black" }} />
    </div>
  );
};

export default SideBar;
