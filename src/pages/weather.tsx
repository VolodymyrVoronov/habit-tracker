import React from "react";
import Head from "next/head";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import { ErrorBoundary } from "react-error-boundary";
import { ProgressSpinner } from "primereact/progressspinner";

import ErrorBox from "@/components/ErrorBox/ErrorBox";
import CentredWrapper from "@/components/CentredWrapper/CentredWrapper";

const WeatherScreen = dynamic(
  () => import("@/screens/WeatherScreen/WeatherScreen"),
  {
    loading: () => (
      <CentredWrapper>
        <ProgressSpinner aria-label="Loading..." />
      </CentredWrapper>
    ),
  }
);

const Weather: NextPage = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Weather</title>
        <meta name="description" content="App for tracking your habits" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ErrorBoundary fallback={<ErrorBox />}>
        <WeatherScreen />
      </ErrorBoundary>
    </>
  );
};

export default Weather;
