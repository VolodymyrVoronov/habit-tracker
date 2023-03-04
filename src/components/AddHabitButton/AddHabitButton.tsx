import React from "react";
import { Button } from "primereact/button";
import { motion } from "framer-motion";

import styles from "./AddHabitButton.module.css";

interface IAddHabitButtonProps {
  onClick: () => void;
}

const AddHabitButton = ({ onClick }: IAddHabitButtonProps): JSX.Element => {
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
        },
      }}
    >
      <Button
        onClick={onClick}
        className={styles.root}
        icon="pi pi-plus"
        type="button"
        aria-label="Add new habit"
        title="Add new habit"
      />
    </motion.div>
  );
};

export default AddHabitButton;
