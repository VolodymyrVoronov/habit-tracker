import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Variants, motion } from "framer-motion";
import { Button } from "primereact/button";
import cn from "classnames";
import uniqid from "uniqid";

import trpc from "@/utils/trpc";

import SideBar from "../SideBar/SideBar";
import Dialog from "../Dialog/Dialog";
import HabitIcons from "../HabitIcons/HabitIcons";
import Form from "../Form/Form";
import Habit from "../Habit/Habit";

import styles from "./MainScreen.module.css";

const boxAnimation: Variants = {
  initial: {
    scale: 0,
    opacity: 0,
  },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      delay: 1,
      duration: 0.5,
      ease: "easeIn",
    },
  },
};

const MainScreen = (): JSX.Element => {
  const [selectedHabit, setSelectedHabit] = useState<number>(0);

  const [habitData, setHabitData] = useState({
    habit: "",
    habitInformation: "",
    target: 0,
  });

  const [selectedIcon, setSelectedIcon] = useState({
    iconCode: "",
    iconName: "",
  });

  const [dialogOpen, setDialogOpen] = useState(false);

  const {
    data: habits,
    refetch: refetchHabits,
    isLoading: isLoadingFetchHabits,
    isSuccess: isSuccessFetchHabits,
    isError: isErrorFetchHabits,
    error: errorFetchHabits,
  } = trpc.useQuery(["findAllHabits"], { enabled: false });

  const {
    data: habit,
    refetch: refetchHabit,
    isLoading: isLoadingFetchHabit,
    isSuccess: isSuccessFetchHabit,
    isError: isErrorFetchHabit,
    error: errorFetchHabit,
  } = trpc.useQuery(["findHabitById", { id: selectedHabit }], {
    enabled: !!selectedHabit,
  });

  const {
    mutate: mutateCreateHabit,
    isLoading: isLoadingCreateHabit,
    isSuccess: isSuccessCreateHabit,
    isError: isErrorCreateHabit,
    error: errorCreateHabit,
  } = trpc.useMutation(["crateHabit"], {
    onSuccess: () => {
      refetchHabits();
      setDialogOpen(false);
    },
  });

  const {
    mutate: mutateDeleteHabit,
    isLoading: isLoadingDeleteHabit,
    isSuccess: isSuccessDeleteHabit,
    isError: isErrorDeleteHabit,
    error: errorDeleteHabit,
  } = trpc.useMutation(["deleteHabit"], {
    onSuccess: () => {
      refetchHabits();
      refetchHabit();
    },
  });

  const {
    mutate: mutateUpdateCommentsHabit,
    isLoading: isLoadingUpdateCommentsHabit,
    isSuccess: isSuccessUpdateCommentsHabit,
    isError: isErrorUpdateCommentsHabit,
    error: errorUpdateCommentsHabit,
  } = trpc.useMutation(["updateComments"], {
    onSuccess: () => {
      refetchHabits();
      refetchHabit();
    },
  });

  const onUserHabitClick = useMemo(
    () =>
      (id: number): void => {
        setSelectedHabit(id);
      },
    []
  );

  const onAddHabitClick = useMemo(
    () => (): void => {
      setDialogOpen(true);
    },
    []
  );

  const onCloseDialogButtonClick = (flag: boolean): void => {
    setDialogOpen(flag);
  };

  const onHabitIconClick = useMemo(
    () => (iconCode: string, iconName: string) => {
      setSelectedIcon({ iconCode, iconName });
    },
    []
  );

  const onFormChange = useMemo(
    () =>
      (data: {
        habit: string;
        habitInformation: string;
        target: number;
      }): void => {
        setHabitData(data);
      },
    []
  );

  const onDeleteIconClick = (): void => {
    setSelectedIcon({ iconCode: "", iconName: "" });
  };

  const onSaveNewHabitButtonClick = (): void => {
    mutateCreateHabit({
      habit: habitData.habit,
      habitInformation: habitData.habitInformation,
      target: habitData.target,
      iconCode: selectedIcon.iconCode,
      iconName: selectedIcon.iconName,
      comments: "",
    });
  };

  const onDeleteClick = useMemo(
    () =>
      (id: number): void => {
        mutateDeleteHabit({ id });
      },
    [mutateDeleteHabit]
  );

  const onAddCommentClick = useMemo(
    () =>
      (comment: string): void => {
        const newComment = {
          id: uniqid(),
          comment,
        };

        if (habit?.comments === "") {
          mutateUpdateCommentsHabit({
            id: selectedHabit,
            comments: JSON.stringify([newComment]),
          });
        }

        if (habit?.comments !== "") {
          const comments = JSON.parse(habit?.comments as string);

          comments.push(newComment);

          mutateUpdateCommentsHabit({
            id: selectedHabit,
            comments: JSON.stringify(comments),
          });
        }
      },
    [habit?.comments, mutateUpdateCommentsHabit, selectedHabit]
  );

  useEffect(() => {
    refetchHabits();
  }, [refetchHabits]);

  return (
    <div className={styles.root}>
      <SideBar
        habits={habits}
        onUserHabitClick={onUserHabitClick}
        onAddHabitClick={onAddHabitClick}
      />

      <Dialog
        headerTitle="New habit"
        isVisible={dialogOpen}
        onHideClick={onCloseDialogButtonClick}
        footerContent={
          <>
            <Button
              label="Cancel"
              severity="secondary"
              icon="pi pi-times"
              onClick={() => {
                setSelectedIcon({ iconCode: "", iconName: "" });
                setDialogOpen(false);
              }}
              outlined
            />
            <Button
              label="Save"
              icon="pi pi-save"
              onClick={onSaveNewHabitButtonClick}
              autoFocus
              disabled={!habitData.habit || !habitData.target}
            />
          </>
        }
      >
        <HabitIcons onHabitIconClick={onHabitIconClick} />

        <Form
          iconCode={selectedIcon.iconCode}
          iconName={selectedIcon.iconName}
          onFormChange={onFormChange}
          onDeleteIconClick={onDeleteIconClick}
        />
      </Dialog>

      <div className={styles.content}>
        <motion.div
          className={cn(styles.habit, styles["content-box"])}
          variants={boxAnimation}
          initial="initial"
          animate="animate"
        >
          {isSuccessFetchHabit && habit && (
            <Habit
              habitData={habit}
              onDeleteClick={onDeleteClick}
              onAddCommentClick={onAddCommentClick}
            />
          )}
        </motion.div>

        <motion.div
          className={cn(styles.weather, styles["content-box"])}
          variants={boxAnimation}
          initial="initial"
          animate="animate"
        >
          Weather
        </motion.div>

        <motion.div
          className={cn(styles.radio, styles["content-box"])}
          variants={boxAnimation}
          initial="initial"
          animate="animate"
        >
          Radio
        </motion.div>
      </div>
    </div>
  );
};

export default MainScreen;
