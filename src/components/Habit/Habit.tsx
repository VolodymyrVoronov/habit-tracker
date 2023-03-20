import React, { ChangeEvent, memo, useMemo, useState } from "react";
import Image from "next/image";
import { Card } from "primereact/card";
import { ProgressBar } from "primereact/progressbar";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import { motion, AnimatePresence } from "framer-motion";
import cn from "classnames";

import { Habit as HTypes } from "@prisma/client";

import checkLimit from "@/helpers/checkLimit";
import countProgress from "@/helpers/countProgress";

import HabitComment from "../HabitComment/HabitComment";

import styles from "./Habit.module.css";

interface IHabitProps {
  habitData: HTypes;
  onDeleteHabitClick: (id: number) => void;
  onAddCommentClick: (comment: string) => void;
  onDeleteHabitsCommentClick: (id: string) => void;
}

const Habit = ({
  habitData,
  onDeleteHabitClick,
  onAddCommentClick,
  onDeleteHabitsCommentClick,
}: IHabitProps): JSX.Element => {
  const { id, habit, habitInformation, target, iconCode, comments } = habitData;

  const commentsArray = comments === "" ? 0 : JSON.parse(comments as string);

  const habitProgress = useMemo(
    () => countProgress(commentsArray, target),
    [commentsArray, target]
  );

  const habitDone = useMemo(
    () => checkLimit(commentsArray, target),
    [commentsArray, target]
  );

  const [comment, setComment] = useState("");

  const accept = (): void => {
    onDeleteHabitClick(id);
  };

  const onDeleteHabitButtonClick = (
    e: React.MouseEvent<HTMLButtonElement>
  ): void => {
    confirmPopup({
      target: e.currentTarget,
      message: "Do you want to delete this habit?",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      style: {
        boxShadow: "none",
        border: "2px solid #a8b9fa",
      },
      accept,
    });
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

  const onDeleteCommentClick = (commentId: string): void => {
    onDeleteHabitsCommentClick(commentId);
  };

  return (
    <motion.div
      className={styles.root}
      key={iconCode}
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
        transition: {
          duration: 0.5,
        },
      }}
    >
      <ConfirmPopup />

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
                <AnimatePresence mode="wait">
                  <motion.div
                    key={habitProgress}
                    initial={{
                      y: -20,
                      scale: 0.5,
                      opacity: 0,
                    }}
                    animate={{
                      y: 0,
                      scale: [1, 1.1, 1],
                      opacity: 1,
                      transition: {
                        duration: 0.5,
                      },
                    }}
                    exit={{
                      y: 20,
                      scale: 0.5,
                      opacity: 0,
                      transition: {
                        duration: 0.5,
                      },
                    }}
                  >
                    {habitProgress}%
                  </motion.div>
                </AnimatePresence>
              </span>
            </div>
          </div>
        }
        footer={
          <div className={styles.footer}>
            {habitDone && <span className={styles.text}>Target achieved!</span>}

            <Button
              onClick={onDeleteHabitButtonClick}
              className={styles.button}
              severity="danger"
              title="Delete habit"
              rounded
              text
              icon={
                <Image
                  src="/images/ui-icons/trash.png"
                  width="25%"
                  height="25%"
                  priority
                />
              }
            />
          </div>
        }
      >
        <ProgressBar
          className={cn(styles["progress-bar"], {
            [styles["progress-bar-habit-achieved"]]: habitDone,
          })}
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
            {target}
          </span>
        }
        className={cn(styles["card-comments"], {
          [styles["card-comments-with-radius"]]: habitDone,
        })}
      >
        {commentsArray !== 0 && (
          <AnimatePresence>
            {commentsArray
              .reverse()
              .map((c: { id: string; comment: string }) => {
                const { id: commentId, comment: commentString } = c;

                return (
                  <HabitComment
                    key={commentId}
                    id={commentId}
                    comment={commentString}
                    onDeleteClick={onDeleteCommentClick}
                  />
                );
              })}
          </AnimatePresence>
        )}

        {(commentsArray === 0 || commentsArray.length === 0) && (
          <span className={styles["card-no-comments"]}>No comments yet.</span>
        )}
      </Card>

      <AnimatePresence mode="popLayout">
        {!habitDone && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
              transition: {
                delay: 0.5,
                duration: 1,
              },
            }}
            style={{
              paddingBottom: 1.5,
            }}
          >
            <Card className={styles["card-input"]}>
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
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default memo(Habit);
