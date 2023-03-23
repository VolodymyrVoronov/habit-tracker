import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { Card } from "primereact/card";
import { ProgressSpinner } from "primereact/progressspinner";
import { Divider } from "primereact/divider";
import { motion, AnimatePresence } from "framer-motion";
import cn from "classnames";

import getWeatherForecast from "@/services/weatherApi";

import processString from "@/helpers/processString";

import animationVariants from "@/constants/animationVariants";

import WeatherSearch from "@/components/WeatherSearch/WeatherSearch";
import WeatherWidgetFull from "@/components/WeatherWidgetFull/WeatherWidgetFull";

import styles from "./WeatherScreen.module.css";

const WeatherScreen = (): JSX.Element => {
  const [city, setCity] = useState("");

  const { refetch, data, error, isError, isLoading, isFetching } = useQuery(
    "weatherForecast",
    () => getWeatherForecast(city),
    {
      enabled: false,
      refetchOnWindowFocus: false,
    }
  );

  const onSearchInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setCity(e.target.value);
  };

  const onSearchButtonClick = (): void => {
    setCity("");
    refetch();

    if (typeof window !== "undefined") {
      localStorage.setItem("cityWeatherForeCast", city.trim());
    }
  };

  const refetchWeatherForecast = useCallback((): void => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const c = localStorage.getItem("cityWeatherForeCast");

      if (c) {
        setCity(c.trim());

        const tId = setTimeout(() => {
          refetchWeatherForecast();

          clearTimeout(tId);
        }, 500);
      }
    }
  }, [refetchWeatherForecast]);

  return (
    <motion.div
      className={styles.root}
      variants={animationVariants}
      initial="initial"
      animate="animate"
    >
      <div className={styles.wrapper}>
        <WeatherSearch
          className={cn({
            [styles["search-no-city"]]: city.length === 0,
          })}
          city={city}
          isLoading={isLoading || isFetching}
          onSearchChange={onSearchInputChange}
          onSearchClick={onSearchButtonClick}
        />
        <AnimatePresence mode="wait">
          {data && (
            <motion.div
              key={
                data?.data.location.name || data?.data.location.localtime_epoch
              }
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
                transition: {
                  delay: 0.75,
                  duration: 1,
                },
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 1,
                },
              }}
            >
              <Card className={styles.forecast}>
                {isLoading || isFetching ? (
                  <ProgressSpinner style={{ display: "inherit" }} />
                ) : (
                  <div>
                    {isError && error instanceof AxiosError ? (
                      <div>{error?.response?.data.error.message}</div>
                    ) : (
                      <>
                        <div className={styles.place}>
                          <div className={styles.location}>
                            <span className={styles.city}>
                              {data?.data.location.name}
                            </span>
                            <span className={styles.country}>
                              {data?.data.location.country}
                            </span>
                          </div>
                          <div className={styles.location}>
                            <span className={styles.date}>
                              {processString(
                                data?.data.location.localtime,
                                0,
                                10,
                                "-",
                                true,
                                "-"
                              )}
                            </span>
                            <span className={styles.region}>
                              {data?.data.location.region}
                            </span>
                          </div>
                        </div>
                        <Divider />
                        <div className={styles.days}>
                          {data?.data.forecast.forecastday.map((d) => {
                            return <WeatherWidgetFull key={d.date} data={d} />;
                          })}
                        </div>
                      </>
                    )}
                  </div>
                )}
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default WeatherScreen;
