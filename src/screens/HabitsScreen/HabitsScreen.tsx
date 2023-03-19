import React, { useEffect, useMemo, useState } from "react";
import { Variants, motion, LayoutGroup } from "framer-motion";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Dialog } from "primereact/dialog";
import trpc from "@/utils/trpc";

import HabitCardMini from "@/components/HabitCardMini/HabitCardMini";

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
      },
    [setSelectedHabit]
  );

  console.log(habitData);

  return (
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
  );
};

export default HabitsScreen;
