import React from "react";
import Image from "next/image";
import { Avatar } from "primereact/avatar";
import cn from "classnames";

import styles from "./UserHabitButton.module.css";

export interface IUserHabitButtonProps {
  id: number;
  habit: string;
  iconCode: string | null;
  onClick: (id: number) => void;
  selected: boolean;
}

const UserHabitButton = ({
  id,
  habit,
  iconCode,
  onClick,
  selected,
}: IUserHabitButtonProps): JSX.Element => {
  const onUserHabitButtonClick = () => {
    onClick(id);
  };

  return (
    <button
      onClick={onUserHabitButtonClick}
      className={cn(styles.root, {
        [styles["root-selected"]]: selected,
      })}
      type="button"
      title={habit}
      aria-label={habit}
    >
      {iconCode ? (
        <Image
          src={`/images/habit-icons/${iconCode}.png`}
          width="100%"
          height="100%"
          alt={iconCode || "Habit icon"}
        />
      ) : (
        <Avatar className={styles.icon} icon="pi pi-image" />
      )}
    </button>
  );
};

export default UserHabitButton;
