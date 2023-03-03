import React from "react";
import { NextPage } from "next";

import styles from "./MainScreen.module.css";

const MainScreen: NextPage = (): JSX.Element => {
  return (
    <div className={styles.main}>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi ratione
      minima esse nostrum veniam. Repellat tempore id numquam. Sint cumque
      recusandae nihil molestiae voluptatem dolor iusto praesentium. Magni,
      cupiditate numquam!
    </div>
  );
};

export default MainScreen;
