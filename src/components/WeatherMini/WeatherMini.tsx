import React, { ChangeEvent, memo, useState } from "react";
import Image from "next/image";
import { useQuery } from "react-query";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import cn from "classnames";

import getWeatherForecast from "@/services/weatherApi";

import styles from "./WeatherMini.module.css";

const WeatherMini = (): JSX.Element => {
  const [city, setCity] = useState("");

  const { refetch, data, error, isLoading } = useQuery(
    "weatherForecast",
    () => getWeatherForecast("London"),
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
  };

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

      <Card className={styles.card}>Test</Card>
    </div>
  );
};

export default memo(WeatherMini);
