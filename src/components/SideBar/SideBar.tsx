import React from "react";
import { motion } from "framer-motion";

import Logo from "../Logo/Logo";
import AddHabitButton from "../AddHabitButton/AddHabitButton";

import styles from "./SideBar.module.css";

const SideBar = (): JSX.Element => {
  return (
    <motion.div
      className={styles.root}
      initial={{
        x: -150,
        opacity: 0,
      }}
      animate={{
        x: 0,
        opacity: 1,
      }}
    >
      <Logo />

      <AddHabitButton onClick={() => console.log("Add habit button clicked")} />
    </motion.div>
  );
};

export default SideBar;
