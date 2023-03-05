import React from "react";
import Image from "next/image";
import cn from "classnames";

import styles from "./HabitIcon.module.css";

interface IHabitIconProps {
  iconUrl: string;
  codeName: string;
  iconAlt: string;
  iconName: string;
  selected: boolean;

  onClick: (codeName: string, iconName: string) => void;
}

const HabitIcon = ({
  iconUrl,
  codeName,
  iconAlt,
  iconName,
  selected,
  onClick,
}: IHabitIconProps): JSX.Element => {
  const onIconButtonClick = (): void => {
    onClick(codeName, iconName);
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
        className={styles.logo}
        src={`/images/habit-icons/${iconUrl}`}
        width="100%"
        height="100%"
        alt={iconAlt}
      />
      <span className={styles.name}>{iconName}</span>
    </button>
  );
};

export default HabitIcon;
