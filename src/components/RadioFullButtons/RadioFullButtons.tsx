import React from "react";

import { useRadioGlobalState } from "@/state/radioGlobalState";

import radioStreams from "@/constants/radioStreams";

import RadioFullButton from "../RadioFullButton/RadioFullButton";

import styles from "./RadioFullButtons.module.css";

const RadioFullButtons = (): JSX.Element => {
  const { getRadio, getPlaying, setRadio, setPlaying } = useRadioGlobalState();

  const onRadioClick = (radio: {
    id: string;
    name: string;
    stream: string;
  }): void => {
    setRadio(radio);
    setPlaying(true);
  };

  return (
    <div className={styles.root}>
      {radioStreams.map((radio, i) => (
        <RadioFullButton
          key={radio.id}
          selectedRadioId={getRadio().id}
          radio={radio}
          isPlaying={getPlaying()}
          onRadioClick={onRadioClick}
        />
      ))}
    </div>
  );
};

export default RadioFullButtons;
