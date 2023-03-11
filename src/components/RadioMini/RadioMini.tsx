import React, { memo } from "react";
import { Dropdown } from "primereact/dropdown";
import { Card } from "primereact/card";
import { motion, AnimatePresence } from "framer-motion";

import { useGlobalState } from "@/state";

import radioStreams from "@/constants/radioStreams";

import styles from "./RadioMini.module.css";

const RadioMini = (): JSX.Element => {
  const { getRadio, getPlaying, getMuted, setRadio, setPlaying, setMuted } =
    useGlobalState();

  const onRadioButtonClick = (selectedRadio: {
    id: string;
    name: string;
    stream: string;
  }): void => {
    setRadio({
      id: selectedRadio.id,
      name: selectedRadio.name,
      stream: selectedRadio.stream,
    });
    setPlaying(true);
  };

  const onPlayPauseButtonClick = (): void => {
    setPlaying(!getPlaying());
  };

  const onMuteButtonClick = (): void => {
    setMuted(!getMuted());
  };

  return (
    <div className={styles.root}>
      <Card className={styles.card}>
        <div className={styles.header}>
          <AnimatePresence mode="wait">
            <motion.div
              key={getRadio().name}
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
                  duration: 0.25,
                },
              }}
            >
              {getRadio().name ? (
                <span className={styles.title}>
                  {getRadio().name}

                  {getPlaying() && (
                    <motion.i
                      className="pi pi-circle-fill"
                      style={{ fontSize: "0.5rem", color: "red" }}
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    />
                  )}
                </span>
              ) : (
                <span className={styles.title}>Select a radio</span>
              )}
            </motion.div>
          </AnimatePresence>

          <Dropdown
            className={styles.select}
            value={getRadio()}
            onChange={(e) => onRadioButtonClick(e.value)}
            options={radioStreams}
            optionLabel="name"
          />
        </div>
      </Card>

      <Card className={styles.card}>
        <div className={styles.controls}>
          <button
            className={styles.button}
            onClick={onPlayPauseButtonClick}
            type="button"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={String(getPlaying())}
                initial={{
                  y: -20,
                  scale: 0.5,
                  opacity: 0,
                }}
                animate={{
                  y: 0,
                  scale: [1, 1.1, 1],
                  opacity: 1,
                  transition: {
                    duration: 0.25,
                  },
                }}
                exit={{
                  y: 20,
                  scale: 0.5,
                  opacity: 0,
                  transition: {
                    duration: 0.25,
                  },
                }}
              >
                {getPlaying() ? (
                  <i className="pi pi-pause" />
                ) : (
                  <i className="pi pi-play" />
                )}
              </motion.div>
            </AnimatePresence>
          </button>

          <button
            className={styles.button}
            onClick={onMuteButtonClick}
            type="button"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={String(getMuted())}
                initial={{
                  y: -20,
                  scale: 0.5,
                  opacity: 0,
                }}
                animate={{
                  y: 0,
                  scale: [1, 1.1, 1],
                  opacity: 1,
                  transition: {
                    duration: 0.25,
                  },
                }}
                exit={{
                  y: 20,
                  scale: 0.5,
                  opacity: 0,
                  transition: {
                    duration: 0.25,
                  },
                }}
              >
                {getMuted() ? (
                  <i className="pi pi-volume-off" />
                ) : (
                  <i className="pi pi-volume-up" />
                )}
              </motion.div>
            </AnimatePresence>
          </button>
        </div>
      </Card>
    </div>
  );
};

export default memo(RadioMini);
