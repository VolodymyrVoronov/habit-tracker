import { PropsWithChildren } from "react";
import { motion } from "framer-motion";

import styles from "./UserHabitButtons.module.css";

// eslint-disable-next-line @typescript-eslint/ban-types
interface IUserHabitButtonsProps extends PropsWithChildren<{}> {}

const UserHabitButtons = ({
  children,
}: IUserHabitButtonsProps): JSX.Element => {
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
          duration: 0.5,
        },
      }}
    >
      <div className={styles.buttons}>{children}</div>
    </motion.div>
  );
};

export default UserHabitButtons;
