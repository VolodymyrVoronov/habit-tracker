import { DetailedHTMLProps, HTMLAttributes } from "react";

interface IWeatherForecastParameterProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> {
  parValue: number | string;
  parTitle: string;
  parType?: string;
}

const WeatherForecastParameter = ({
  parValue,
  parTitle,
  parType,

  ...props
}: IWeatherForecastParameterProps): JSX.Element => {
  return (
    <span {...props}>
      <span>{parTitle}</span>

      <strong>
        <span>
          {" "}
          {parValue} {parType}
        </span>
      </strong>
    </span>
  );
};

export default WeatherForecastParameter;
