import React from "react";
import { Variants, motion } from "framer-motion";
import cn from "classnames";

import styles from "./MainScreen.module.css";
import SideBar from "../SideBar/SideBar";

const boxAnimation: Variants = {
  initial: {
    scale: 0,
    opacity: 0,
  },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      delay: 1,
      duration: 0.5,
      ease: "easeIn",
    },
  },
};

const MainScreen = (): JSX.Element => {
  const onHabitButtonClick = (id: number): void => {
    console.log(id);
  };

  const onAddHabitButtonClick = (): void => {
    console.log("onAddHabitButtonClick");
  };

  return (
    <div className={styles.root}>
      <SideBar
        onHabitButtonClick={onHabitButtonClick}
        onAddHabitButtonClick={onAddHabitButtonClick}
      />

      <div className={styles.content}>
        <motion.div
          className={cn(styles.habit, styles["content-box"])}
          variants={boxAnimation}
          initial="initial"
          animate="animate"
        >
          Habit
        </motion.div>

        <motion.div
          className={cn(styles.weather, styles["content-box"])}
          variants={boxAnimation}
          initial="initial"
          animate="animate"
        >
          Weather
        </motion.div>

        <motion.div
          className={cn(styles.radio, styles["content-box"])}
          variants={boxAnimation}
          initial="initial"
          animate="animate"
        >
          Radio
        </motion.div>
      </div>
    </div>
  );
};

export default MainScreen;
