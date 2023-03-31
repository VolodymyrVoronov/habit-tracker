import React, { PropsWithChildren } from "react";

import styles from "./CentredWrapper.module.css";

interface ICentredWrapperProps {}

const CentredWrapper = ({
  children,
}: PropsWithChildren<ICentredWrapperProps>): JSX.Element => {
  return <div className={styles.root}>{children}</div>;
};

export default CentredWrapper;
