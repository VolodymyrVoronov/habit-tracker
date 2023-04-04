import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

import { useRadioGlobalState } from "../../state/radioGlobalState";

import styles from "./RadioFullButtons.module.css";

const RadioFullButtons = (): JSX.Element => {
  const { getRadio, getPlaying, getMuted, setPlaying, setMuted } =
    useRadioGlobalState();

  const onPlayPauseButtonClick = (): void => {
    setPlaying(!getPlaying());
  };

  const onSoundButtonClick = (): void => {
    setMuted(!getMuted());
  };

  return (
    <motion.div
      className={styles.controls}
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
        transition: {
          duration: 0.5,
          delay: 0.5,
          ease: "easeInOut",
        },
      }}
    >
      <button
        className={styles.button}
        onClick={onPlayPauseButtonClick}
        type="button"
        title={`${getPlaying() ? "Pause" : "Play"}`}
        disabled={getRadio().stream.length === 0}
        data-testid="play-button"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={String(getPlaying())}
            initial={{
              y: -30,
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
              y: 30,
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
                width={200}
                height={200}
                alt="Pause button"
                priority
              />
            ) : (
              <Image
                src="/images/radio-icons/play-button.png"
                width={200}
                height={200}
                alt="Play button"
                priority
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
        data-testid="sound-button"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={String(getMuted())}
            initial={{
              y: -30,
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
              y: 30,
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
                width={200}
                height={200}
                alt="Sound off"
                priority
              />
            ) : (
              <Image
                src="/images/radio-icons/sound-on.png"
                width={200}
                height={200}
                alt="Sound on"
                priority
              />
            )}
          </motion.div>
        </AnimatePresence>
      </button>
    </motion.div>
  );
};

export default RadioFullButtons;
