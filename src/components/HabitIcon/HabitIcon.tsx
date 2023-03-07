import React from "react";
import Image from "next/image";
import cn from "classnames";

import styles from "./HabitIcon.module.css";

interface IHabitIconProps {
  iconUrl: string;
  iconCode: string;
  iconAlt: string;
  iconName: string;
  selected: boolean;

  onClick: (iconCode: string, iconName: string) => void;
}

const HabitIcon = ({
  iconUrl,
  iconCode,
  iconAlt,
  iconName,
  selected,
  onClick,
}: IHabitIconProps): JSX.Element => {
  const onIconButtonClick = (): void => {
    onClick(iconCode, iconName);
  };

  return (
    <button
      onClick={onIconButtonClick}
      className={cn(styles.root, {
        [styles["root-selected"]]: selected,
      })}
      type="button"
      title={iconName}
    >
      <Image
        src={`/images/habit-icons/${iconUrl}`}
        width="75%"
        height="75%"
        alt={iconAlt}
      />
      <span className={styles.name}>{iconName}</span>
    </button>
  );
};

export default HabitIcon;
