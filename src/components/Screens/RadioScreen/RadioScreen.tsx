import React from "react";
import { AnimatePresence, Variants, motion } from "framer-motion";
import cn from "classnames";

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
  return (
    <motion.div
      className={styles.root}
      variants={animationVariants}
      initial="initial"
      animate="animate"
    >
      <div className={cn(styles.box, styles.buttons)}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Et neque
        dignissimos, at obcaecati culpa libero voluptate. Amet, ut dicta facere
        nulla quaerat cupiditate sunt, ab et incidunt consequatur, eligendi
        culpa?
      </div>
      <div className={cn(styles.box, styles.radios)}>
        <RadioFullButtons />
      </div>
    </motion.div>
  );
};

export default RadioScreen;
