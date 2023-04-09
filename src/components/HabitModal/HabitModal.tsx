import React, { useMemo } from "react";
import Image from "next/image";
import { LayoutGroup, motion } from "framer-motion";
import { ProgressBar } from "primereact/progressbar";
import { Button } from "primereact/button";
import { Habit } from "@prisma/client";
import { Divider } from "primereact/divider";
import { Dialog } from "primereact/dialog";

import checkLimit from "../../helpers/checkLimit";
import countProgress from "../../helpers/countProgress";

import styles from "./HabitModal.module.css";

interface IHabitModalProps {
  habitData: Habit;
  dialogOpen: boolean;
  onCloseClick: (flag: boolean) => void;
}

const HabitModal = ({
  habitData,
  dialogOpen,
  onCloseClick,
}: IHabitModalProps): JSX.Element => {
  const { target, comments } = habitData;

  const commentsArray = comments === "" ? 0 : JSON.parse(comments as string);

  const habitProgress = useMemo(
    () => countProgress(commentsArray, target),
    [commentsArray, target]
  );

  const habitDone = useMemo(
    () => checkLimit(commentsArray, target),
    [commentsArray, target]
  );

  return (
    <Dialog
      className={styles.modal}
      header={
        <div className={styles["modal-header"]}>
          <h2 className={styles["modal-title"]}>
            {habitData.habit}
            {habitData.iconCode && (
              <span className={styles["modal-icon"]}>
                <Image
                  src={`/images/habit-icons/${habitData.iconCode}.png`}
                  width="50%"
                  height="50%"
                  alt={habitData.iconName || "Habit icon"}
                />
              </span>
            )}
          </h2>

          <Divider />

          <div className={styles["header-progress"]}>
            <span className={styles["header-target"]}>
              Day {commentsArray && commentsArray.length} of {habitData.target}
              {habitDone && (
                <span className={styles["header-target-done"]}>
                  {habitDone && "Achieved 🔥🎉"}
                </span>
              )}
            </span>

            <Divider layout="vertical" />

            <div className={styles["header-progress-bar"]}>
              <span>Progress:</span> <ProgressBar value={habitProgress} />
            </div>
          </div>

          <Divider />
        </div>
      }
      visible={dialogOpen}
      onHide={() => onCloseClick(false)}
      footer={
        <Button
          label="Cancel"
          severity="secondary"
          icon="pi pi-times"
          onClick={() => {
            onCloseClick(false);
          }}
          outlined
        />
      }
    >
      <div className={styles.comments}>
        {commentsArray !== 0 && (
          <LayoutGroup>
            {commentsArray
              .reverse()
              .map((c: { id: string; comment: string }, i: number) => {
                const { id: commentId, comment: commentString } = c;
                return (
                  <motion.div
                    key={commentId}
                    layout
                    initial={{
                      x: -100,
                      opacity: 0,
                    }}
                    animate={{
                      x: 0,
                      opacity: 1,
                      transition: {
                        duration: 0.5,
                        delay: i * 0.2,
                      },
                    }}
                    className={styles.comment}
                    data-testid="comment-test-id"
                  >
                    {commentString}
                  </motion.div>
                );
              })}
          </LayoutGroup>
        )}

        {(commentsArray === 0 || commentsArray.length === 0) && (
          <span className={styles["no-comments"]}>No comments yet.</span>
        )}
      </div>
    </Dialog>
  );
};

export default HabitModal;
