import React from "react";
import { ToggleButton } from "primereact/togglebutton";
import { motion, AnimatePresence } from "framer-motion";
import cn from "classnames";

import { useRadioGlobalState } from "@/state/radioGlobalState";

import animationVariants from "@/constants/animationVariants";

import RadioFullStations from "@/components/RadioFullStations/RadioFullStations";
import RadioFullButtons from "@/components/RadioFullButtons/RadioFullButtons";

import styles from "./RadioScreen.module.css";

const RadioScreen = (): JSX.Element => {
  const { getPlaying, getCoolMode, setCoolMode } = useRadioGlobalState();

  const onCoolButtonClick = (): void => {
    setCoolMode(!getCoolMode());
  };

  return (
    <>
      <motion.div
        className={styles.root}
        variants={animationVariants}
        initial="initial"
        animate="animate"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={String(getPlaying()) + String(getCoolMode())}
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
              transition: {
                duration: 0.25,
              },
            }}
            exit={{
              opacity: 0,
              transition: {
                duration: 0.5,
              },
            }}
          >
            {getCoolMode() && getPlaying() && (
              <div
                className={cn({
                  [styles["root-cool"]]: getCoolMode() && getPlaying(),
                })}
              >
                <div className={styles.wave} />
                <div className={styles.wave} />
                <div className={styles.wave} />
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div
          className={cn(styles.box, styles.buttons, {
            [styles["buttons-cool"]]: getCoolMode() && getPlaying(),
          })}
        >
          <RadioFullButtons />
        </div>
        <div
          className={cn(styles.box, styles.stations, {
            [styles["stations-cool"]]: getCoolMode() && getPlaying(),
          })}
        >
          <RadioFullStations />
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={String(getPlaying())}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
            transition: {
              duration: 0.25,
            },
          }}
          exit={{
            opacity: 0,
            transition: {
              duration: 0.5,
            },
          }}
        >
          {getPlaying() && (
            <div className={styles["cool-button"]}>
              <ToggleButton
                checked={getCoolMode()}
                onChange={onCoolButtonClick}
                offLabel="Cool"
                onLabel="Usual"
              />
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default RadioScreen;
