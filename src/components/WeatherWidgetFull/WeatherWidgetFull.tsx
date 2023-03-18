import React, { memo } from "react";
import Image from "next/image";

import { IForecastDay } from "@/services/weatherApi";

import WeatherForecastParameter from "../WeatherForecastParameter/WeatherForecastParameter";

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
              <WeatherForecastParameter
                parValue={data?.day.mintemp_c}
                parTitle="Min temp:"
                parType="°C"
              />
            )}

            {data?.day.maxtemp_f !== undefined && (
              <WeatherForecastParameter
                parValue={data?.day.maxtemp_c}
                parTitle="Max temp:"
                parType="°C"
              />
            )}
          </div>

          <div className={styles.wind}>
            {data?.day.maxtemp_f !== undefined && (
              <WeatherForecastParameter
                parValue={data?.day.maxwind_kph}
                parTitle="Max wind:"
                parType="km/h"
              />
            )}
          </div>

          <div className={styles.humidity}>
            {data?.day.avghumidity !== undefined && (
              <WeatherForecastParameter
                parValue={data?.day.avghumidity}
                parTitle="Humidity:"
                parType="%"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(WeatherWidgetFull);
