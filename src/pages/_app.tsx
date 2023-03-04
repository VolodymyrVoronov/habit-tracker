import { withTRPC } from "@trpc/next";
import "@fontsource/poppins";
import "@fontsource/advent-pro";

import {
  AppType,
  NextComponentType,
  NextPageContext,
} from "next/dist/shared/lib/utils";

import type { ServerRouter } from "@/server/router";

import Dock from "@/components/Dock/Dock";

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import "../styles/globals.css";

const App: AppType = ({
  Component,
  pageProps,
}: {
  Component: NextComponentType<NextPageContext, any, object>;
  pageProps: any;
}) => {
  return (
    <>
      <Component {...pageProps} />
      <Dock />
    </>
  );
};

export default withTRPC<ServerRouter>({
  config({ ctx }) {
    const url = "http://localhost:3000/api/trpc";

    return { url };
  },
  ssr: true,
})(App);
