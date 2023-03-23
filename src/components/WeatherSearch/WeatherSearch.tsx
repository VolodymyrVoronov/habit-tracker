import React from "react";
import Image from "next/image";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import cn from "classnames";

import styles from "./WeatherSearch.module.css";

interface IWeatherSearchProps {
  city: string;
  isLoading: boolean;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchClick: () => void;

  className?: string;
}

const WeatherSearch = ({
  city,
  isLoading,
  onSearchChange,
  onSearchClick,

  className,
}: IWeatherSearchProps): JSX.Element => {
  return (
    <Card className={cn(styles.card, className)}>
      <div className={styles.search}>
        <span className={styles.city}>City</span>
        <div className="p-inputgroup">
          <InputText
            id="City"
            value={city}
            onChange={onSearchChange}
            className={cn("p-inputtext-xs", styles.input)}
            type="text"
            name="city"
          />
          <Button
            onClick={onSearchClick}
            className="p-button-success"
            title="Search city"
            outlined
            icon={
              <Image
                src="/images/ui-icons/search.png"
                width="25%"
                height="25%"
                priority
                alt="Search city icon"
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
  );
};

export default WeatherSearch;
