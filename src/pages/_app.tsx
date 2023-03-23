import { AppProps } from "next/app";
import { withTRPC } from "@trpc/next";
import { motion } from "framer-motion";
import ReactHowler from "react-howler";

import "@fontsource/poppins";
import "@fontsource/advent-pro";

import {
  AppType,
  NextComponentType,
  NextPageContext,
} from "next/dist/shared/lib/utils";

import type { ServerRouter } from "@/server/index";

import { useRadioGlobalState } from "@/state/radioGlobalState";

import TransitionLayout from "@/components/TransitionLayout/TransitionLayout";
import Dock from "@/components/Dock/Dock";

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import "../styles/globals.css";

const App: AppType = ({
  Component,
  pageProps,
}: {
  Component: NextComponentType<NextPageContext, object, object>;
  pageProps: AppProps;
}) => {
  const { getRadio, getPlaying, getMuted } = useRadioGlobalState();

  return (
    <>
      <TransitionLayout>
        <Component {...pageProps} />
      </TransitionLayout>

      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
          transition: {
            duration: 1,
            delay: 1,
          },
        }}
      >
        <Dock />

        {getRadio().stream.length > 0 && (
          <ReactHowler
            src={getRadio().stream}
            playing={getPlaying()}
            mute={getMuted()}
            html5
            volume={1}
          />
        )}
      </motion.div>
    </>
  );
};

export default withTRPC<ServerRouter>({
  config() {
    const url = "http://localhost:3000/api/trpc";

    return { url };
  },
  ssr: true,
})(App);
