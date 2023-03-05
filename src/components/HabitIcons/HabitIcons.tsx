import React, { useState } from "react";
import { motion, LayoutGroup } from "framer-motion";

import habitIcons from "@/constants/habitIcons";

import HabitIcon from "../HabitIcon/HabitIcon";

import styles from "./HabitIcons.module.css";

interface IHabitIconsProps {
  onHabitIconClick: (codeName: string, iconName: string) => void;
}

const HabitIcons = ({ onHabitIconClick }: IHabitIconsProps): JSX.Element => {
  const [selectedHabitIcon, setSelectedHabitIcon] = useState("");

  const habitClickHandler = (codeName: string) => {
    setSelectedHabitIcon(codeName);
  };

  return (
    <div className={styles.root}>
      <LayoutGroup>
        {habitIcons.map(({ id, iconUrl, codeName, iconAlt, iconName }, i) => {
          return (
            <motion.div
              onClick={() => habitClickHandler(codeName)}
              layout
              key={id}
              initial={{
                x: -100,
                scale: 0,
                opacity: 0,
              }}
              animate={{
                x: 0,
                scale: 1,
                opacity: 1,
                transition: {
                  duration: 0.5,
                  delay: i * 0.1,
                },
              }}
              style={{ display: "flex" }}
            >
              <HabitIcon
                iconUrl={iconUrl}
                codeName={codeName}
                iconAlt={iconAlt}
                iconName={iconName}
                selected={selectedHabitIcon === codeName}
                onClick={onHabitIconClick}
              />
            </motion.div>
          );
        })}
      </LayoutGroup>
    </div>
  );
};

export default HabitIcons;
