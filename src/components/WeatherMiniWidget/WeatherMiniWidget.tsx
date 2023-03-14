import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Divider } from "primereact/divider";

import { IWeatherDataResponse } from "@/services/weatherApi";

import styles from "./WeatherMiniWidget.module.css";

interface IWeatherMiniWidgetProps {
  data?: IWeatherDataResponse;
}

const WeatherMiniWidget = ({ data }: IWeatherMiniWidgetProps): JSX.Element => {
  const myImageLoader = (): string => {
    return `https://${data?.current.condition.icon.slice(2)}`;
  };

  return (
    <AnimatePresence mode="wait">
      {data && (
        <motion.div
          key={data?.location.name || data?.location.localtime_epoch}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
            transition: {
              duration: 0.5,
            },
          }}
          exit={{
            opacity: 0,
            transition: {
              duration: 0.5,
            },
          }}
        >
          <div className={styles.root}>
            <div className={styles.header}>
              <div className={styles.location}>
                <span className={styles.city}>{data?.location.name}</span>
                <span className={styles.country}>{data?.location.country}</span>
              </div>
              <span className={styles.date}>
                {data?.location.localtime
                  .slice(0, 10)
                  .split("-")
                  .reverse()
                  .join("-")}
              </span>
            </div>

            <Divider style={{ marginBottom: 0 }} />

            <div className={styles.body}>
              <div className={styles.condition}>
                <div className={styles.icon}>
                  <Image
                    loader={myImageLoader}
                    src={`https://${data?.current.condition.icon.slice(2)}`}
                    alt={data?.current.condition.text}
                    width="100%"
                    height="100%"
                    unoptimized
                  />
                </div>

                <span className={styles["condition-text"]}>
                  {data?.current.condition.text}
                </span>
              </div>

              <Divider layout="vertical" style={{ marginLeft: 0 }} />

              <div className={styles.forecast}>
                {data?.current.humidity !== undefined && (
                  <span className={styles.humidity}>
                    <span>Humidity:</span>
                    <strong>
                      <strong>
                        <span>{data?.current.humidity} %</span>
                      </strong>
                    </strong>
                  </span>
                )}

                {data?.current.temp_c !== undefined && (
                  <span className={styles.temp}>
                    <span>Temp:</span>
                    <strong>
                      <span>{data?.current.temp_c} °C</span>
                    </strong>
                  </span>
                )}

                {data?.current.feelslike_c !== undefined && (
                  <span className={styles.feelslike}>
                    <span>Feels like:</span>
                    <strong>
                      <span>{data?.current.feelslike_c} °C</span>
                    </strong>
                  </span>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WeatherMiniWidget;
