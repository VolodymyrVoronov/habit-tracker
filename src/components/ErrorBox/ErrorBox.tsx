import React from "react";
import Image from "next/image";

import styles from "./ErrorBox.module.css";

interface IErrorBoxProps {
  errorMessage?: string;
}

const ErrorBox = ({
  errorMessage = "Something went wrong!",
}: IErrorBoxProps): JSX.Element => {
  return (
    <div className={styles.root}>
      <h2 className={styles.message}>{errorMessage}</h2>
      <div className={styles.icon}>
        <Image
          src="/images/ui-icons/error.png"
          alt="Error icon"
          width="100%"
          height="100%"
        />
      </div>
    </div>
  );
};

export default ErrorBox;
