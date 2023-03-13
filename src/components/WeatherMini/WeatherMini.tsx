import React, {
  ChangeEvent,
  memo,
  useCallback,
  useEffect,
  useState,
} from "react";
import Image from "next/image";
import { useQuery } from "react-query";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { ProgressSpinner } from "primereact/progressspinner";
import cn from "classnames";

import getWeatherForecast from "@/services/weatherApi";

import styles from "./WeatherMini.module.css";

const WeatherMini = (): JSX.Element => {
  const [city, setCity] = useState("");

  const { refetch, data, error, isLoading } = useQuery(
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
      localStorage.setItem("cityWeatherForeCast", city);
    }
  };

  const refetchWeatherForecast = useCallback((): void => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const c = localStorage.getItem("cityWeatherForeCast");

      if (c) {
        setCity(c);

        const tID = setTimeout(() => {
          refetchWeatherForecast();

          clearTimeout(tID);
        }, 500);
      }
    }
  }, [refetchWeatherForecast]);

  console.log(data);

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
            />
          </div>
          <small className={styles.tip}>
            Search city to get current weather forecast
          </small>
        </div>
      </Card>

      <Card className={styles.card}>
        {isLoading ? (
          <div className="card flex justify-content-center">
            <ProgressSpinner />
          </div>
        ) : (
          <div className={styles.weather}>{data?.location.name}</div>
        )}
      </Card>
    </div>
  );
};

export default memo(WeatherMini);
