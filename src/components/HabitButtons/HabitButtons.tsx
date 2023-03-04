import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

import styles from "./HabitButtons.module.css";

interface IHabitButtonsProps {
  children: ReactNode;
}

const HabitButtons = ({ children }: IHabitButtonsProps): JSX.Element => {
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
      <AnimatePresence>{children}</AnimatePresence>
    </motion.div>
  );
};

export default HabitButtons;
