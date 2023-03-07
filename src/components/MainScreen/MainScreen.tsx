import React, { useEffect, useMemo, useState } from "react";
import { Variants, motion } from "framer-motion";
import { Button } from "primereact/button";
import cn from "classnames";

import trpc from "@/utils/trpc";

import SideBar from "../SideBar/SideBar";
import Dialog from "../Dialog/Dialog";
import HabitIcons from "../HabitIcons/HabitIcons";
import Form from "../Form/Form";

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
  } = trpc.useQuery(["findAllHabits"]);

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

  const onUserHabitClick = useMemo(
    () =>
      (id: number): void => {
        console.log(id);
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
          Habit
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
