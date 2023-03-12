import React, { memo } from "react";
import Image from "next/image";
import { Dropdown } from "primereact/dropdown";
import { Card } from "primereact/card";
import { motion, AnimatePresence } from "framer-motion";
import cn from "classnames";

import { useRadioGlobalState } from "@/state/radioGlobalState";

import radioStreams from "@/constants/radioStreams";

import styles from "./RadioMini.module.css";

const RadioMini = (): JSX.Element => {
  const { getRadio, getPlaying, getMuted, setRadio, setPlaying, setMuted } =
    useRadioGlobalState();

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

  const onSoundButtonClick = (): void => {
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
            className={cn(styles.select, {
              [styles["select-playing"]]: getPlaying(),
            })}
            value={getRadio()}
            onChange={(e) => onRadioButtonClick(e.value)}
            options={radioStreams}
            optionLabel="name"
            title="Select a radio"
          />
        </div>
      </Card>

      <Card className={styles.card}>
        <div className={styles.controls}>
          <button
            className={styles.button}
            onClick={onPlayPauseButtonClick}
            type="button"
            title={`${getPlaying() ? "Pause" : "Play"}`}
            disabled={getRadio().stream.length === 0}
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
                  <Image
                    src="/images/radio-icons/pause-button.png"
                    width="100%"
                    height="100%"
                    alt="Pause button"
                  />
                ) : (
                  <Image
                    src="/images/radio-icons/play-button.png"
                    width="100%"
                    height="100%"
                    alt="Play button"
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </button>

          <button
            className={styles.button}
            onClick={onSoundButtonClick}
            type="button"
            title={`${getMuted() ? "Unmute" : "Mute"}`}
            disabled={getRadio().stream.length === 0}
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
                  <Image
                    src="/images/radio-icons/sound-off.png"
                    width="100%"
                    height="100%"
                    alt="Sound off"
                  />
                ) : (
                  <Image
                    src="/images/radio-icons/sound-on.png"
                    width="100%"
                    height="100%"
                    alt="Sound on"
                  />
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
