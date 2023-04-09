import React from "react";

import { useRadioGlobalState } from "../../state/radioGlobalState";

import radioStreams from "../../constants/radioStreams";

import RadioFullStation from "../RadioFullStation/RadioFullStation";

import styles from "./RadioFullStations.module.css";

const RadioFullStations = (): JSX.Element => {
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
      {radioStreams.map((radio) => (
        <RadioFullStation
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

export default RadioFullStations;
