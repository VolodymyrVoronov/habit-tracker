import React from "react";

import styles from "./MainScreen.module.css";
import SideBar from "../SideBar/SideBar";

const MainScreen = (): JSX.Element => {
  return (
    <div className={styles.root}>
      <SideBar />
    </div>
  );
};

export default MainScreen;
