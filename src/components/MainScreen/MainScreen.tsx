import React, { useState } from "react";
import { Variants, motion } from "framer-motion";
import { Button } from "primereact/button";
import cn from "classnames";

import SideBar from "../SideBar/SideBar";
import Dialog from "../Dialog/Dialog";

import styles from "./MainScreen.module.css";

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
  const [dialogOpen, setDialogOpen] = useState(false);

  const onUserHabitButtonClick = (id: number): void => {
    console.log(id);
  };

  const onAddHabitButtonClick = (): void => {
    setDialogOpen(true);
  };

  const onCloseDialogButtonClick = (flag: boolean): void => {
    setDialogOpen(flag);
  };

  return (
    <div className={styles.root}>
      <SideBar
        onUserHabitButtonClick={onUserHabitButtonClick}
        onAddHabitButtonClick={onAddHabitButtonClick}
      />

      <Dialog
        headerTitle="New habit"
        isVisible={dialogOpen}
        onHideClick={onCloseDialogButtonClick}
        footerContent={
          <>
            <Button
              label="Cancel"
              severity="secondary"
              icon="pi pi-times"
              onClick={() => setDialogOpen(false)}
              outlined
            />
            <Button
              label="Save"
              icon="pi pi-save"
              onClick={() => {}}
              autoFocus
            />
          </>
        }
      >
        Test
      </Dialog>

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
