import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { Card } from "primereact/card";
import { ProgressSpinner } from "primereact/progressspinner";
import { Variants, motion, AnimatePresence } from "framer-motion";
import cn from "classnames";

import getWeatherForecast from "@/services/weatherApi";

import WeatherSearch from "@/components/WeatherSearch/WeatherSearch";

import styles from "./WeatherScreen.module.css";

const animationVariants: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeIn",
    },
  },
};

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
      <WeatherSearch
        city={city}
        isLoading={isLoading || isFetching}
        onSearchChange={onSearchInputChange}
        onSearchClick={onSearchButtonClick}
      />

      <Card className={styles.forecast}>
        {isLoading || isFetching ? (
          <ProgressSpinner />
        ) : (
          <div>
            {isError && error instanceof AxiosError ? (
              <div>{error?.response?.data.error.message}</div>
            ) : (
              <div className={styles.weather}>{data?.data.current.cloud}</div>
            )}
          </div>
        )}
      </Card>
    </motion.div>
  );
};

export default WeatherScreen;
