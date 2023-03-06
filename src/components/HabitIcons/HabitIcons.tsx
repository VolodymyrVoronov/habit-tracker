import React, { ChangeEvent, memo, useState } from "react";
import { motion, LayoutGroup } from "framer-motion";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import cn from "classnames";

import habitIcons from "@/constants/habitIcons";

import HabitIcon from "../HabitIcon/HabitIcon";

import styles from "./HabitIcons.module.css";

interface IHabitIconsProps {
  onHabitIconClick: (codeName: string, iconName: string) => void;
}

const HabitIcons = ({ onHabitIconClick }: IHabitIconsProps): JSX.Element => {
  const [selectedHabitIcon, setSelectedHabitIcon] = useState("");
  const [searchText, setSearchText] = useState("");

  const onHabitIconButtonClick = (codeName: string): void => {
    setSelectedHabitIcon(codeName);
  };

  const onSearchInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchText(e.target.value.toLowerCase());
  };

  const onClearSearchInputButtonClick = (): void => {
    setSearchText("");
  };

  return (
    <div className={styles.root}>
      <div className={cn("p-inputgroup", styles.search)}>
        <InputText
          value={searchText}
          onChange={onSearchInputChange}
          placeholder="Search icon..."
          type="text"
        />

        <Button
          onClick={onClearSearchInputButtonClick}
          icon="pi pi-trash"
          className="p-button-danger"
        />
      </div>

      <div className={styles.icons}>
        <LayoutGroup>
          {habitIcons
            .filter((hi) => hi.iconName.toLowerCase().includes(searchText))
            .map(({ id, iconUrl, codeName, iconAlt, iconName }, i) => {
              return (
                <motion.div
                  onClick={() => onHabitIconButtonClick(codeName)}
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
                      delay: i * 0.01,
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
    </div>
  );
};

export default memo(HabitIcons);
