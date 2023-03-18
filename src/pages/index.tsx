import { NextPage } from "next";
import Head from "next/head";

import MainScreen from "@/components/screens/MainScreen/MainScreen";

const Home: NextPage = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Habit Tracker - Home</title>
        <meta name="description" content="App for tracking your habits" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainScreen />
    </>
  );
};

export default Home;
