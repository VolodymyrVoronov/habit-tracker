import React, { memo } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Dock as D } from "primereact/dock";

import Path from "../../constants/paths";

import styles from "./Dock.module.css";

let onIconButtonClick: (href: string) => void;

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
      onIconButtonClick(Path.MAIN);
    },
  },
  {
    label: "Habits",
    icon: () => (
      <Image
        src="/images/dock-icons/habits.png"
        width="100%"
        height="100%"
        alt="Icon habits"
      />
    ),
    command: () => {
      onIconButtonClick(Path.HABITS);
    },
  },
  {
    label: "Weather",
    icon: () => (
      <Image
        src="/images/dock-icons/weather.png"
        width="100%"
        height="100%"
        alt="Icon weather"
      />
    ),
    command: () => {
      onIconButtonClick(Path.WEATHER);
    },
  },
  {
    label: "Radio",
    icon: () => (
      <Image
        src="/images/dock-icons/radio.png"
        width="100%"
        height="100%"
        alt="Icon radio"
      />
    ),
    command: () => {
      onIconButtonClick(Path.RADIO);
    },
  },
];

const Dock = (): JSX.Element => {
  const router = useRouter();

  onIconButtonClick = (href: string): void => {
    router.push(href);
  };

  return <D className={styles.dock} model={dockItems} position="bottom" />;
};

export default memo(Dock);
