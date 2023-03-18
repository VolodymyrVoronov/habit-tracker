import React from "react";
import Image from "next/image";

import { IForecastDay } from "@/services/weatherApi";

import styles from "./WeatherWidgetFull.module.css";

interface IWeatherWidgetFullProps {
  data?: IForecastDay;
}

const WeatherWidgetFull = ({ data }: IWeatherWidgetFullProps): JSX.Element => {
  const myImageLoader = (): string => {
    return `https://${data?.day.condition.icon.slice(2)}`;
  };

  return (
    <div className={styles.root}>
      <span className={styles.date}>
        {data?.date.slice(0, 10).split("-").reverse().join("-")}
      </span>

      <div className={styles.condition}>
        <div className={styles.icon}>
          <Image
            loader={myImageLoader}
            src={`https://${data?.day.condition.icon.slice(2)}`}
            alt={data?.day.condition.text}
            width="100%"
            height="100%"
            unoptimized
          />
        </div>

        <span className={styles["condition-text"]}>
          {data?.day.condition.text}
        </span>

        <div className={styles.forecast}>
          <div className={styles.temp}>
            {data?.day.mintemp_c !== undefined && (
              <span>
                <span>Min temp:</span>

                <strong>
                  <span> {data?.day.mintemp_c} °C</span>
                </strong>
              </span>
            )}

            {data?.day.maxtemp_f !== undefined && (
              <span>
                <span>Max temp:</span>

                <strong>
                  <span> {data?.day.maxtemp_c} °C</span>
                </strong>
              </span>
            )}
          </div>

          <div className={styles.wind}>
            {data?.day.maxtemp_f !== undefined && (
              <span>
                <span>Max wind:</span>

                <strong>
                  <span> {data?.day.maxwind_kph} km/h</span>
                </strong>
              </span>
            )}
          </div>

          <div className={styles.humidity}>
            {data?.day.avghumidity !== undefined && (
              <span>
                <span>Humidity:</span>

                <strong>
                  <span> {data?.day.avghumidity} %</span>
                </strong>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidgetFull;
