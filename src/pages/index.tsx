import { NextPage } from "next";
import Head from "next/head";
import { ErrorBoundary } from "react-error-boundary";

import MainScreen from "@/screens/MainScreen/MainScreen";
import ErrorBox from "@/components/ErrorBox/ErrorBox";

const Home: NextPage = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Habit Tracker - Home</title>
        <meta name="description" content="App for tracking your habits" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ErrorBoundary fallback={<ErrorBox />}>
        <MainScreen />
      </ErrorBoundary>
    </>
  );
};

export default Home;
