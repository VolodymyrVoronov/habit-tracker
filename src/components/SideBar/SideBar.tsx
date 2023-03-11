import React, { memo, useEffect, useState } from "react";
import { motion, LayoutGroup } from "framer-motion";

import { Habit } from "@prisma/client";

import Logo from "../Logo/Logo";
import AddHabitButton from "../AddHabitButton/AddHabitButton";
import UserHabitButtons from "../UserHabitButtons/UserHabitButtons";
import UserHabitButton from "../UserHabitButton/UserHabitButton";

import styles from "./SideBar.module.css";

interface ISideBarProps {
  habits: Habit[] | undefined;
  onUserHabitClick: (id: number) => void;
  onAddHabitClick: () => void;
}

const SideBar = ({
  habits,
  onUserHabitClick,
  onAddHabitClick,
}: ISideBarProps): JSX.Element => {
  const [selectedIcon, setSelectedIcon] = useState(0);

  const onAddHabitButtonClick = (id: number): void => {
    onUserHabitClick(id);
    setSelectedIcon(id);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const sH = localStorage.getItem("setSelectedHabit");

      setSelectedIcon(Number(sH));
    }
  }, []);

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
        {habits && habits.length > 0 ? (
          <LayoutGroup>
            {habits.map(({ id, habit, iconCode }, i) => (
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
                  iconCode={iconCode}
                  habit={habit}
                  onClick={() => onAddHabitButtonClick(id)}
                  selected={selectedIcon === id}
                />
              </motion.div>
            ))}
          </LayoutGroup>
        ) : (
          <span className={styles.pointer}>
            Start adding new habit!
            <motion.i
              className="pi pi-angle-double-down"
              style={{ fontSize: "2rem" }}
              animate={{ y: [0, 20, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          </span>
        )}
      </UserHabitButtons>

      <AddHabitButton onClick={onAddHabitClick} />
    </motion.div>
  );
};

export default memo(SideBar);
