import React from "react";
import Image from "next/image";

import styles from "./UserHabitButton.module.css";

export interface IUserHabitButtonProps {
  id: number;
  habit: string;
  codeName: string;
  onClick: (id: number) => void;
}

const UserHabitButton = ({
  id,
  habit,
  codeName,
  onClick,
}: IUserHabitButtonProps): JSX.Element => {
  const onUserHabitButtonClick = () => {
    onClick(id);
  };

  return (
    <button
      onClick={onUserHabitButtonClick}
      className={styles.root}
      type="button"
      title={habit}
      aria-label={habit}
    >
      <Image
        src={`/images/habit-icons/${codeName}.png`}
        width="100%"
        height="100%"
      />
    </button>
  );
};

export default UserHabitButton;
