import React from "react";
import Image from "next/image";

import styles from "./Logo.module.css";

const Logo = (): JSX.Element => {
  return (
    <div className={styles.root}>
      <Image
        className={styles.logo}
        src="/images/logo.png"
        width="100%"
        height="100%"
      />
      <h1 className={styles.title}>Habit Tracker</h1>
    </div>
  );
};

export default Logo;
