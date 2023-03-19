import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Variants, motion, LayoutGroup, AnimatePresence } from "framer-motion";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { ProgressBar } from "primereact/progressbar";
import { Button } from "primereact/button";

import trpc from "@/utils/trpc";

import HabitCardMini from "@/components/HabitCardMini/HabitCardMini";
import HabitModal from "@/components/HabitModal/HabitModal";

import styles from "./HabitsScreen.module.css";

const animationVariants: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeIn",
    },
  },
};

const HabitsScreen = (): JSX.Element => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedHabit, setSelectedHabit] = useState<number>(0);

  const {
    data: habits,
    refetch: refetchHabits,
    isLoading: isLoadingFetchHabits,
    isError: isErrorFetchHabits,
    error: errorFetchHabits,
  } = trpc.useQuery(["findAllHabits"], { enabled: false });

  const {
    mutate: mutateDeleteHabit,
    isLoading: isLoadingDeleteHabit,
    isError: isErrorDeleteHabit,
    error: errorDeleteHabit,
  } = trpc.useMutation(["deleteHabit"], {
    onSuccess: () => {
      refetchHabits();
    },
  });

  const {
    data: habitData,
    refetch: refetchHabit,
    isLoading: isLoadingFetchHabit,
    isSuccess: isSuccessFetchHabit,
    isError: isErrorFetchHabit,
    error: errorFetchHabit,
  } = trpc.useQuery(["findHabitById", { id: selectedHabit }], {
    enabled: !!selectedHabit,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    refetchHabits();
  }, [refetchHabits]);

  const onDeleteHabitButtonClick = useMemo(
    () => (id: number) => {
      confirmDialog({
        message: "Do you want to delete this habit?",
        icon: "pi pi-info-circle",
        acceptClassName: "p-button-danger",
        style: {
          boxShadow: "none",
          border: "2px solid #a8b9fa",
        },
        accept: () => mutateDeleteHabit({ id }),
      });
    },
    [mutateDeleteHabit]
  );

  const onCardClick = useMemo(
    () =>
      (id: number): void => {
        setSelectedHabit(id);
        setDialogOpen(true);
      },
    [setSelectedHabit]
  );

  const onCloseDialogButtonClick = (flag: boolean): void => {
    setDialogOpen(flag);
  };

  console.log(habitData);

  return (
    <>
      {(isLoadingFetchHabits ||
        isLoadingFetchHabit ||
        isLoadingDeleteHabit) && (
        <AnimatePresence mode="wait">
          <motion.div
            key={String(
              isLoadingFetchHabits ||
                isLoadingFetchHabit ||
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

      {!isLoadingFetchHabit && habitData && (
        <HabitModal
          habitData={habitData}
          dialogOpen={dialogOpen}
          onCloseClick={onCloseDialogButtonClick}
        />
      )}

      <motion.div
        className={styles.root}
        variants={animationVariants}
        initial="initial"
        animate="animate"
      >
        <ConfirmDialog />

        <div className={styles.cards}>
          <LayoutGroup>
            {!isLoadingFetchHabits &&
              !isErrorFetchHabits &&
              habits &&
              habits.map((habit, i) => {
                return (
                  <motion.div
                    layout
                    key={habit.id}
                    initial={{
                      y: -100,
                      opacity: 0,
                    }}
                    animate={{
                      y: 0,
                      opacity: 1,
                      transition: {
                        duration: 0.5,
                        delay: i * 0.2,
                      },
                    }}
                  >
                    <HabitCardMini
                      habitData={habit}
                      onCardClick={onCardClick}
                      onDeleteClick={onDeleteHabitButtonClick}
                    />
                  </motion.div>
                );
              })}
          </LayoutGroup>
        </div>
      </motion.div>
    </>
  );
};

export default HabitsScreen;
