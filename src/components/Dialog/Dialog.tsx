import React, { ReactNode } from "react";
import { Dialog as D } from "primereact/dialog";

import styles from "./Dialog.module.css";

interface IDialogProps {
  headerTitle: string;
  isVisible: boolean;
  onHideClick: (flag: boolean) => void;
  footerContent: JSX.Element;
  children: ReactNode;
}

const Dialog = ({
  headerTitle = "Header",
  isVisible,
  onHideClick,
  footerContent,
  children,
}: IDialogProps): JSX.Element => {
  const onHideButtonClick = () => {
    onHideClick(false);
  };

  return (
    <D
      className={styles.root}
      header={headerTitle}
      headerClassName={styles.header}
      draggable={false}
      closeOnEscape={false}
      visible={isVisible}
      onHide={onHideButtonClick}
      footer={footerContent}
    >
      <div className={styles.content}>{children}</div>
    </D>
  );
};

export default Dialog;
