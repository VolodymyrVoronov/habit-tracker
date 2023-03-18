import React, { ChangeEvent, memo, useEffect, useState } from "react";
import Image from "next/image";
import { motion, LayoutGroup } from "framer-motion";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import cn from "classnames";

import habitIcons from "@/constants/habitIcons";

import HabitIcon from "@/components/HabitIcon/HabitIcon";

import styles from "./HabitIcons.module.css";

interface IHabitIconsProps {
  iC: string;
  onHabitIconClick: (iconCode: string, iconName: string) => void;
}

const HabitIcons = ({
  iC,
  onHabitIconClick,
}: IHabitIconsProps): JSX.Element => {
  const [selectedHabitIcon, setSelectedHabitIcon] = useState("");
  const [searchText, setSearchText] = useState("");

  const onHabitIconButtonClick = (selectedIconCode: string): void => {
    setSelectedHabitIcon(selectedIconCode);
  };

  const onSearchInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchText(e.target.value.toLowerCase());
  };

  const onClearSearchInputButtonClick = (): void => {
    setSearchText("");
  };

  useEffect(() => {
    if (iC === "") {
      setSelectedHabitIcon("");
    }
  }, [iC]);

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
          className="p-button-danger"
          severity="danger"
          title="Clear field"
          outlined
          icon={
            <Image
              src="/images/ui-icons/backspace.png"
              width="25%"
              height="25%"
            />
          }
        />
      </div>

      <div className={styles.icons}>
        <LayoutGroup>
          {habitIcons
            .filter((hi) => hi.iconName.toLowerCase().includes(searchText))
            .map(({ id, iconUrl, iconCode, iconAlt, iconName }, i) => {
              return (
                <motion.div
                  onClick={() => onHabitIconButtonClick(iconCode)}
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
                    iconCode={iconCode}
                    iconAlt={iconAlt}
                    iconName={iconName}
                    selected={selectedHabitIcon === iconCode}
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
