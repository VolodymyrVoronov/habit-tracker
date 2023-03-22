import React, {
  ChangeEvent,
  memo,
  useCallback,
  useEffect,
  useState,
} from "react";
import Image from "next/image";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { Card } from "primereact/card";
import { ProgressSpinner } from "primereact/progressspinner";

import getWeatherForecast from "@/services/weatherApi";

import WeatherWidgetMini from "@/components/WeatherWidgetMini/WeatherWidgetMini";
import WeatherSearch from "@/components/WeatherSearch/WeatherSearch";

import styles from "./WeatherMini.module.css";

const WeatherMini = (): JSX.Element => {
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
    <div className={styles.root}>
      <WeatherSearch
        city={city}
        isLoading={isLoading || isFetching}
        onSearchChange={onSearchInputChange}
        onSearchClick={onSearchButtonClick}
      />

      <Card className={styles.card}>
        {!data && (
          <div className={styles["search-no-city"]}>
            <Image
              src="/images/ui-icons/search-map.png"
              alt="Search icon map"
              width="100%"
              height="100%"
              unoptimized
            />
          </div>
        )}

        {isLoading || isFetching ? (
          <ProgressSpinner />
        ) : (
          <div>
            {isError && error instanceof AxiosError ? (
              <div>{error?.response?.data.error.message}</div>
            ) : (
              <div className={styles.weather}>
                <WeatherWidgetMini data={data?.data} />
              </div>
            )}
          </div>
        )}
      </Card>
    </div>
  );
};

export default memo(WeatherMini);
