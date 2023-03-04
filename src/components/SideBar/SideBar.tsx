import React from "react";
import { motion, LayoutGroup } from "framer-motion";

import habitIcons from "@/constants/habitIcons";

import Logo from "../Logo/Logo";
import AddHabitButton from "../AddHabitButton/AddHabitButton";
import HabitButtons from "../HabitButtons/HabitButtons";
import HabitButton from "../HabitButton/HabitButton";

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
        transition: {
          delay: 0.25,
          duration: 0.5,
        },
      }}
    >
      <Logo />

      <HabitButtons>
        <LayoutGroup>
          {habitIcons.map(({ id, codeName }, i) => (
            <motion.div
              layout
              key={id}
              initial={{
                x: -100,
                opacity: 0,
              }}
              animate={{
                x: 0,
                opacity: 1,
                transition: {
                  duration: 0.5,
                  delay: i * 0.2,
                },
              }}
            >
              <HabitButton
                key={id}
                id={id}
                codeName={codeName}
                habit=""
                onClick={() => {}}
              />
            </motion.div>
          ))}
        </LayoutGroup>
      </HabitButtons>

      <AddHabitButton onClick={() => console.log("Add habit button clicked")} />
    </motion.div>
  );
};

export default SideBar;
