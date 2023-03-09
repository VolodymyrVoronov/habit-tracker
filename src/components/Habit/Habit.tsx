import React, { ChangeEvent, memo, useMemo, useState } from "react";
import Image from "next/image";
import { Card } from "primereact/card";
import { ProgressBar } from "primereact/progressbar";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { motion, AnimatePresence } from "framer-motion";
import cn from "classnames";

import { Habit as HTypes } from "@prisma/client";

import countProgress from "@/helpers/countProgress";

import styles from "./Habit.module.css";

interface IHabitProps {
  habitData: HTypes;
  onDeleteClick: (id: number) => void;
  onAddCommentClick: (comment: string) => void;
}

const Habit = ({
  habitData,
  onDeleteClick,
  onAddCommentClick,
}: IHabitProps): JSX.Element => {
  const { id, habit, habitInformation, target, iconCode, comments } = habitData;

  const commentsArray = comments === "" ? 0 : JSON.parse(comments as string);
  const habitProgress = useMemo(
    () => countProgress(commentsArray, target),
    [commentsArray, target]
  );

  const [comment, setComment] = useState("");

  const onDeleteButtonClick = (): void => {
    onDeleteClick(id);
  };

  const onCommentInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target) {
      setComment(e.target.value);
    }
  };

  const onAddCommentButtonClick = (): void => {
    if (comment) {
      onAddCommentClick(comment);
      setComment("");
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className={styles.root}
        key={iconCode}
        initial={{
          scale: 0.95,
          opacity: 0,
        }}
        animate={{
          scale: 1,
          opacity: 1,
          transition: {
            duration: 0.5,
          },
        }}
      >
        <Card
          className={cn(styles.card)}
          title={
            <div className={styles.header}>
              <h2 className={styles.title}>
                {habit}

                {iconCode && (
                  <span className={styles["title-icon"]}>
                    <Image
                      src={`/images/habit-icons/${iconCode}.png`}
                      width="25%"
                      height="25%"
                    />
                  </span>
                )}
              </h2>
              <div className={styles.progress}>
                <span className={styles["progress-text"]}>Progress</span>
                <span className={styles["progress-percent"]}>
                  {habitProgress}%
                </span>
              </div>
            </div>
          }
          footer={
            <div className={styles.footer}>
              <Button
                onClick={onDeleteButtonClick}
                className={styles.button}
                rounded
                icon="pi pi-trash"
                severity="danger"
              />
            </div>
          }
        >
          <ProgressBar
            className={styles["progress-bar"]}
            value={habitProgress}
          />

          {habitInformation && (
            <p className={styles.information}>{habitInformation}</p>
          )}
        </Card>

        <Card
          title={
            <span className={styles["card-comments-title"]}>
              Daily comments | Day {commentsArray && commentsArray.length} of{" "}
              {target}:
            </span>
          }
          className={cn(styles.card, styles["card-comments"])}
        >
          {commentsArray !== 0 && <p>Comments</p>}

          <div className={styles.input}>
            <InputText
              onChange={onCommentInputChange}
              className={styles["input-field"]}
              value={comment}
              aria-describedby="Comment"
              placeholder="Comment"
              name="comment"
            />
            <Button
              onClick={onAddCommentButtonClick}
              disabled={!comment}
              className={styles["input-button"]}
            >
              Add
            </Button>
          </div>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
};

export default memo(Habit);
