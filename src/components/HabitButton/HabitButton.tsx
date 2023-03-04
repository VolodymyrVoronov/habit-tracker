import React from "react";
import Image from "next/image";

import styles from "./HabitButton.module.css";

export interface IHabitButtonProps {
  id: number;
  habit: string;
  habitIcon: string;
  onClick: (id: number) => void;
}

const HabitButton = ({
  id,
  habit,
  habitIcon,
  onClick,
}: IHabitButtonProps): JSX.Element => {
  const onHabitButtonClick = () => {
    onClick(id);
  };

  return (
    <button
      onClick={onHabitButtonClick}
      className={styles.root}
      type="button"
      title={habit}
    >
      <Image
        src={`/images/habit-icons/${habitIcon}`}
        width="100%"
        height="100%"
      />
    </button>
  );
};

export default HabitButton;
