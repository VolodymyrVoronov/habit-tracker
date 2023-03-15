import React from "react";
import cn from "classnames";
import { motion } from "framer-motion";

import styles from "./RadioFullButton.module.css";

interface IRadioFullButtonProps {
  radio: {
    id: string;
    name: string;
    stream: string;
  };
  selectedRadioId: string;
  isPlaying: boolean;
  onRadioClick: (radio: { id: string; name: string; stream: string }) => void;
}

const RadioFullButton = ({
  radio,
  selectedRadioId,
  isPlaying,
  onRadioClick,
}: IRadioFullButtonProps): JSX.Element => {
  const onRadioButtonClick = (): void => {
    onRadioClick(radio);
  };

  return (
    <motion.button
      onClick={onRadioButtonClick}
      className={cn(styles.root, {
        [styles["root-active"]]: selectedRadioId === radio.id,
      })}
      type="button"
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
        transition: {
          duration: 0.5,
          delay: 0.5,
          ease: "easeInOut",
        },
      }}
      title={radio.name}
    >
      <span className={styles.name}>{radio.name}</span>

      {isPlaying && selectedRadioId === radio.id && (
        <motion.i
          className="pi pi-circle-fill"
          style={{ fontSize: "1.25rem", color: "tomato" }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
      )}
    </motion.button>
  );
};

export default RadioFullButton;
