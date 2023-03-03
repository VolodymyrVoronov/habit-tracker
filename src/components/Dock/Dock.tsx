import React from "react";
import { NextPage } from "next";
import Image from "next/image";
import { Dock as D } from "primereact/dock";

import styles from "./Dock.module.css";

const dockItems = [
  {
    label: "Main",
    icon: () => (
      <Image
        src="/images/dock-icons/home.png"
        width="100%"
        height="100%"
        alt="Icon main"
      />
    ),
    command: () => {
      console.log("Main");
    },
  },
  {
    label: "Habits",
    icon: () => (
      <Image
        src="/images/dock-icons/habits.png"
        width="100%"
        height="100%"
        alt="Icon main"
      />
    ),
    command: () => {
      console.log("Habits");
    },
  },
  {
    label: "Weather",
    icon: () => (
      <Image
        src="/images/dock-icons/weather.png"
        width="100%"
        height="100%"
        alt="Icon main"
      />
    ),
    command: () => {
      console.log("Weather");
    },
  },
  {
    label: "Radio",
    icon: () => (
      <Image
        src="/images/dock-icons/radio.png"
        width="100%"
        height="100%"
        alt="Icon main"
      />
    ),
    command: () => {
      console.log("Radio");
    },
  },
];

const Dock: NextPage = (): JSX.Element => {
  return <D className={styles.dock} model={dockItems} position="bottom" />;
};

export default Dock;
