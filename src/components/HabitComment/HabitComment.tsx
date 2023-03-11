import React from "react";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { confirmPopup } from "primereact/confirmpopup";
import { motion } from "framer-motion";

import styles from "./HabitComment.module.css";

interface IHabitCommentProps {
  id: string;
  comment: string;
  onDeleteClick: (id: string) => void;
}

const HabitComment = ({
  id,
  comment,
  onDeleteClick,
}: IHabitCommentProps): JSX.Element => {
  const accept = (): void => {
    onDeleteClick(id);
  };

  const onDeleteButtonClick = (
    e: React.MouseEvent<HTMLButtonElement>
  ): void => {
    confirmPopup({
      target: e.currentTarget,
      message: "Do you want to delete this comment?",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      style: {
        boxShadow: "none",
        border: "2px solid #a8b9fa",
      },
      accept,
    });
  };

  return (
    <motion.div
      className={styles.root}
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
        transition: {
          delay: 0.5,
          duration: 0.5,
        },
      }}
    >
      <p className={styles.comment}>{comment}</p>
      <Divider layout="vertical" />
      <div className={styles.button}>
        <Button
          onClick={onDeleteButtonClick}
          rounded
          icon="pi pi-trash"
          severity="danger"
        />
      </div>
    </motion.div>
  );
};

export default HabitComment;
