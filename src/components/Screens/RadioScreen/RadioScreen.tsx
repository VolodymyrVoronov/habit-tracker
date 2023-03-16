import React, { useState } from "react";
import { ToggleButton } from "primereact/togglebutton";
import { Variants, motion } from "framer-motion";
import cn from "classnames";

import RadioFullStations from "@/components/RadioFullStations/RadioFullStations";
import RadioFullButtons from "@/components/RadioFullButtons/RadioFullButtons";

import styles from "./RadioScreen.module.css";

const animationVariants: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeIn",
    },
  },
};

const RadioScreen = (): JSX.Element => {
  const [cool, setCool] = useState(false);

  const onCoolButtonClick = (): void => {
    setCool(!cool);
  };

  return (
    <>
      <motion.div
        className={cn(styles.root, {
          [styles["root-cool"]]: cool,
        })}
        variants={animationVariants}
        initial="initial"
        animate="animate"
      >
        <div className={cn(styles.box, styles.buttons)}>
          <RadioFullButtons />
        </div>
        <div className={cn(styles.box, styles.stations)}>
          <RadioFullStations />
        </div>
      </motion.div>

      <div className={styles["cool-button"]}>
        <ToggleButton
          checked={cool}
          onChange={onCoolButtonClick}
          offLabel="Cool"
          onLabel="Not cool"
        />
      </div>
    </>
  );
};

export default RadioScreen;
