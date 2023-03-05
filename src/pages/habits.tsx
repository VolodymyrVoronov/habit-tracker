import React from "react";
import Head from "next/head";
import { NextPage } from "next";

const Habits: NextPage = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Habits</title>
        <meta name="description" content="App for tracking your habits" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>habits</div>
    </>
  );
};

export default Habits;
