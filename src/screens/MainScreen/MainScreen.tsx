import React, { useEffect, useMemo, useState, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "primereact/button";
import { ProgressSpinner } from "primereact/progressspinner";
import { ProgressBar } from "primereact/progressbar";
import { Toast } from "primereact/toast";
import cn from "classnames";
import uniqid from "uniqid";

import trpc from "@/utils/trpc";

import animationVariants from "@/constants/animationVariants";

import SideBar from "@/components/SideBar/SideBar";
import Dialog from "@/components/Dialog/Dialog";
import HabitIcons from "@/components/HabitIcons/HabitIcons";
import Form from "@/components/Form/Form";
import Habit from "@/components/Habit/Habit";
import RadioMini from "@/components/RadioMini/RadioMini";
import WeatherMini from "@/components/WeatherMini/WeatherMini";

import styles from "./MainScreen.module.css";

const MainScreen = (): JSX.Element => {
  const toast = useRef<Toast>(null);

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
    refetchOnWindowFocus: false,
  });

  const {
    mutate: mutateCreateHabit,
    isLoading: isLoadingCreateHabit,
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

        if (typeof window !== "undefined") {
          localStorage.setItem("setSelectedHabit", String(id));
        }
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

  const onDeleteHabitClick = useMemo(
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

  const onDeleteHabitsCommentClick = useMemo(
    () =>
      (id: string): void => {
        const newComments = JSON.parse(habit?.comments as string);

        newComments.splice(
          newComments.findIndex((comment: { id: string }) => comment.id === id),
          1
        );

        mutateUpdateCommentsHabit({
          id: selectedHabit,
          comments: JSON.stringify(newComments),
        });
      },
    [habit?.comments, mutateUpdateCommentsHabit, selectedHabit]
  );

  useEffect(() => {
    refetchHabits();
  }, [refetchHabits]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const sH = localStorage.getItem("setSelectedHabit");

      setSelectedHabit(Number(sH));
    }
  }, []);

  useEffect(() => {
    if (
      toast.current &&
      (isErrorFetchHabits ||
        isErrorFetchHabit ||
        isErrorCreateHabit ||
        isErrorDeleteHabit ||
        isErrorUpdateCommentsHabit)
    ) {
      toast.current?.show({
        severity: "error",
        summary: "Error occurred",
        detail:
          errorFetchHabits?.message ||
          errorFetchHabit?.message ||
          errorCreateHabit?.message ||
          errorDeleteHabit?.message ||
          errorUpdateCommentsHabit?.message ||
          "Something went wrong, try again later",
        life: 5000,
      });
    }
  }, [
    isErrorFetchHabits,
    isErrorFetchHabit,
    isErrorCreateHabit,
    isErrorDeleteHabit,
    isErrorUpdateCommentsHabit,
    errorFetchHabits?.message,
    errorFetchHabit?.message,
    errorCreateHabit?.message,
    errorDeleteHabit?.message,
    errorUpdateCommentsHabit?.message,
  ]);

  return (
    <>
      <Toast ref={toast} />

      {(isLoadingFetchHabits ||
        isLoadingFetchHabit ||
        isLoadingCreateHabit ||
        isLoadingUpdateCommentsHabit ||
        isLoadingDeleteHabit) && (
        <AnimatePresence mode="wait">
          <motion.div
            key={String(
              isLoadingFetchHabits ||
                isLoadingFetchHabit ||
                isLoadingCreateHabit ||
                isLoadingUpdateCommentsHabit ||
                isLoadingDeleteHabit
            )}
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
              transition: {
                duration: 1,
                delay: 0.5,
              },
            }}
          >
            <ProgressBar
              mode="indeterminate"
              style={{
                position: "absolute",
                zIndex: 999,
                top: 0,
                left: 0,
                width: "100%",
                height: "7px",
                borderRadius: 0,
              }}
              color="#059bb4"
            />
          </motion.div>
        </AnimatePresence>
      )}

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
                disabled={
                  !habitData.habit || !habitData.target || isLoadingCreateHabit
                }
                loading={isLoadingCreateHabit}
              />
            </>
          }
        >
          <HabitIcons
            iC={selectedIcon.iconCode}
            onHabitIconClick={onHabitIconClick}
          />

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
            variants={animationVariants}
            initial="initial"
            animate="animate"
          >
            {!isLoadingDeleteHabit &&
              !isLoadingFetchHabit &&
              isSuccessFetchHabit &&
              habit && (
                <Habit
                  habitData={habit}
                  onDeleteHabitClick={onDeleteHabitClick}
                  onAddCommentClick={onAddCommentClick}
                  onDeleteHabitsCommentClick={onDeleteHabitsCommentClick}
                />
              )}

            {!habit &&
              !isLoadingFetchHabit &&
              !isErrorFetchHabits &&
              !isErrorFetchHabit &&
              !isErrorCreateHabit &&
              !isErrorDeleteHabit &&
              !isErrorUpdateCommentsHabit && (
                <div className={styles["no-habit-selected"]}>
                  <div className={styles["no-habit-selected-text"]}>
                    No habit selected!
                  </div>
                  <div className={styles["no-habit-selected-icon"]}>
                    <Image
                      src="/images/ui-icons/no-results.png"
                      width="100%"
                      height="100%"
                    />
                  </div>
                </div>
              )}

            {isLoadingDeleteHabit ||
              (isLoadingFetchHabit && (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={String(isLoadingDeleteHabit || isLoadingFetchHabit)}
                    initial={{
                      opacity: 0,
                    }}
                    animate={{
                      opacity: 1,
                      transition: {
                        duration: 1,
                        delay: 1,
                      },
                    }}
                  >
                    <ProgressSpinner
                      className={styles["progress-spinner"]}
                      style={{ width: "100px", height: "100px" }}
                      strokeWidth="5"
                      animationDuration=".5s"
                    />
                  </motion.div>
                </AnimatePresence>
              ))}
          </motion.div>

          <motion.div
            className={cn(styles.weather, styles["content-box"])}
            variants={animationVariants}
            initial="initial"
            animate="animate"
          >
            <WeatherMini />
          </motion.div>

          <motion.div
            className={cn(styles.radio, styles["content-box"])}
            variants={animationVariants}
            initial="initial"
            animate="animate"
          >
            <RadioMini />
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default MainScreen;
