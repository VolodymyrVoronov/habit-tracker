import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import styles from "./Logo.module.css";

const Logo = (): JSX.Element => {
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
      <Image
        className={styles.logo}
        src="/images/logo.png"
        width="100%"
        height="100%"
      />
      <h1 className={styles.title}>Habit Tracker</h1>
    </motion.div>
  );
};

export default Logo;
