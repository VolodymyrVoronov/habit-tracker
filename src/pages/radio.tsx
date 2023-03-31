import React from "react";
import Head from "next/head";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import { ErrorBoundary } from "react-error-boundary";
import { ProgressSpinner } from "primereact/progressspinner";

import ErrorBox from "@/components/ErrorBox/ErrorBox";
import CentredWrapper from "@/components/CentredWrapper/CentredWrapper";

const RadioScreen = dynamic(() => import("@/screens/RadioScreen/RadioScreen"), {
  loading: () => (
    <CentredWrapper>
      <ProgressSpinner aria-label="Loading..." />
    </CentredWrapper>
  ),
});

const Radio: NextPage = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Radio</title>
        <meta name="description" content="App for tracking your habits" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ErrorBoundary fallback={<ErrorBox />}>
        <RadioScreen />
      </ErrorBoundary>
    </>
  );
};

export default Radio;
