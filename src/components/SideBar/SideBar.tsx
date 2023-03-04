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
      }}
    >
      <Logo />

      <HabitButtons>
        <LayoutGroup>
          {habitIcons.map(({ id, iconUrl, codeName }, i) => (
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
                  delay: i * 0.1,
                },
              }}
            >
              <HabitButton
                key={id}
                id={id}
                habitIcon={iconUrl}
                habit={codeName}
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
