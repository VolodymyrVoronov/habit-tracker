import React, {
  ChangeEvent,
  memo,
  useCallback,
  useEffect,
  useState,
} from "react";
import { AxiosError } from "axios";
import Image from "next/image";
import { useQuery } from "react-query";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { ProgressSpinner } from "primereact/progressspinner";
import cn from "classnames";

import getWeatherForecast from "@/services/weatherApi";

import WeatherMiniWidget from "../WeatherMiniWidget/WeatherMiniWidget";

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
      <Card className={styles.card}>
        <div className={styles.search}>
          <span className={styles.city}>City</span>
          <div className="p-inputgroup">
            <InputText
              id="City"
              value={city}
              onChange={onSearchInputChange}
              className={cn("p-inputtext-xs", styles.input)}
              type="text"
              name="city"
            />
            <Button
              onClick={onSearchButtonClick}
              className="p-button-success"
              title="Search city"
              outlined
              icon={
                <Image
                  src="/images/ui-icons/search.png"
                  width="25%"
                  height="25%"
                  priority
                />
              }
              disabled={city.length === 0}
              loading={isLoading}
            />
          </div>
          <small className={styles.tip}>
            Search city to get current weather forecast
          </small>
        </div>
      </Card>

      <Card className={styles.card}>
        {isLoading || isFetching ? (
          <ProgressSpinner />
        ) : (
          <div>
            {isError && error instanceof AxiosError ? (
              <div>{error?.response?.data.error.message}</div>
            ) : (
              <div className={styles.weather}>
                <WeatherMiniWidget data={data?.data} />
              </div>
            )}
          </div>
        )}
      </Card>
    </div>
  );
};

export default memo(WeatherMini);
