import React, { memo, useMemo } from "react";
import Image from "next/image";
import { Card } from "primereact/card";
import { Accordion, AccordionTab } from "primereact/accordion";
import { ProgressBar } from "primereact/progressbar";
import { Button } from "primereact/button";

import { Habit as HTypes } from "@prisma/client";

import countProgress from "@/helpers/countProgress";
import checkLimit from "@/helpers/checkLimit";

import styles from "./HabitCardMini.module.css";

interface IHabitCardMiniProps {
  habitData: HTypes;
  onCardClick: (id: number) => void;
  onDeleteClick: (id: number) => void;
}

const HabitCardMini = ({
  habitData,
  onCardClick,
  onDeleteClick,
}: IHabitCardMiniProps): JSX.Element => {
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

  const onHabitCardClick = (): void => {
    onCardClick(id);
  };

  const onDeleteHabitButtonClick = (): void => {
    onDeleteClick(id);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.root}>
        <Card title={habit} className={styles.card}>
          {iconCode && (
            <span className={styles.icon}>
              <Image
                src={`/images/habit-icons/${iconCode}.png`}
                width="50%"
                height="50%"
                alt="Habit icon"
              />
            </span>
          )}

          {habitInformation && (
            <div className={styles.accordion}>
              <Accordion>
                <AccordionTab header="Information">
                  <p className={styles.information}>{habitInformation}</p>
                </AccordionTab>
              </Accordion>
            </div>
          )}

          <span className={styles.target}>
            Day {commentsArray && commentsArray.length} of {target}
            {habitDone && <span>{habitDone && "Achieved 🔥🎉"}</span>}
          </span>

          <div className={styles["progress-bar"]}>
            <span>Progress:</span> <ProgressBar value={habitProgress} />
          </div>
        </Card>

        <div className={styles.footer}>
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
                alt="Delete habit icon"
              />
            }
          />

          <Button
            onClick={onHabitCardClick}
            className={styles.button}
            severity="success"
            title="More inforamtion"
            rounded
            text
            icon={
              <Image
                src="/images/ui-icons/read-more.png"
                width="40%"
                height="40%"
                priority
                alt="Read more icon"
              />
            }
          />
        </div>
      </div>
    </div>
  );
};

export default memo(HabitCardMini);
