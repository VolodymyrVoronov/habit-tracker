import React, { useMemo } from "react";
import Image from "next/image";
import { Card } from "primereact/card";
import { ProgressBar } from "primereact/progressbar";
import { Button } from "primereact/button";
import { motion, AnimatePresence } from "framer-motion";

import { Habit as HTypes } from "@prisma/client";

import countProgress from "@/helpers/countProgress";

import styles from "./Habit.module.css";

interface IHabitProps {
  habitData: HTypes;
  onDeleteClick: (id: number) => void;
}

const Habit = ({ habitData, onDeleteClick }: IHabitProps): JSX.Element => {
  const { id, habit, habitInformation, target, iconCode, comments } = habitData;

  const commentsArray = comments === "" ? 0 : comments?.split(",");
  const habitProgress = useMemo(
    () => countProgress(commentsArray, target),
    [commentsArray, target]
  );

  const onDeleteButtonClick = (): void => {
    onDeleteClick(id);
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
          className={styles.card}
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
      </motion.div>
    </AnimatePresence>
  );
};

export default Habit;
