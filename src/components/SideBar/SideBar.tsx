import React from "react";
import { motion, LayoutGroup } from "framer-motion";

import Logo from "../Logo/Logo";
import AddHabitButton from "../AddHabitButton/AddHabitButton";
import UserHabitButtons from "../UserHabitButtons/UserHabitButtons";
import UserHabitButton from "../UserHabitButton/UserHabitButton";

import styles from "./SideBar.module.css";

interface ISideBarProps {
  onUserHabitButtonClick: (id: number) => void;
  onAddHabitButtonClick: () => void;
}

const SideBar = ({
  onUserHabitButtonClick,
  onAddHabitButtonClick,
}: ISideBarProps): JSX.Element => {
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

      <UserHabitButtons>
        <LayoutGroup>
          {[].map(({ id, codeName }, i) => (
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
              <UserHabitButton
                key={id}
                id={id}
                codeName={codeName}
                habit=""
                onClick={() => onUserHabitButtonClick(id)}
              />
            </motion.div>
          ))}
        </LayoutGroup>
      </UserHabitButtons>

      <AddHabitButton onClick={onAddHabitButtonClick} />
    </motion.div>
  );
};

export default SideBar;
