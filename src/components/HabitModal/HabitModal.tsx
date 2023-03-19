import React, { useMemo, useState } from "react";
import Image from "next/image";
import { ProgressBar } from "primereact/progressbar";
import { Button } from "primereact/button";
import { Habit } from "@prisma/client";
import { Divider } from "primereact/divider";

import checkLimit from "@/helpers/checkLimit";
import countProgress from "@/helpers/countProgress";

import Dialog from "@/components/Dialog/Dialog";

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

  return (
    <Dialog
      headerTitle={
        <div className={styles["modal-header"]}>
          <h2 className={styles["modal-title"]}>
            {habitData.habit}

            {habitData.iconCode && (
              <span className={styles["modal-icon"]}>
                <Image
                  src={`/images/habit-icons/${habitData.iconCode}.png`}
                  width="50%"
                  height="50%"
                />
              </span>
            )}
          </h2>

          <Divider />

          <div className={styles["header-progress"]}>
            <span className={styles["header-target"]}>
              Day {commentsArray && commentsArray.length} of {habitData.target}
            </span>

            <Divider layout="vertical" />

            <div className={styles["header-progress-bar"]}>
              <span>Progress:</span> <ProgressBar value={habitProgress} />
            </div>
          </div>

          <Divider />
        </div>
      }
      isVisible={dialogOpen}
      onHideClick={() => onCloseClick(false)}
      footerContent={
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
      Dialog
    </Dialog>
  );
};

export default HabitModal;
