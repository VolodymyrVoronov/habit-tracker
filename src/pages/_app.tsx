import { withTRPC } from "@trpc/next";

import {
  AppType,
  NextComponentType,
  NextPageContext,
} from "next/dist/shared/lib/utils";

import type { ServerRouter } from "@/server/router";

import "../styles/globals.css";

const App: AppType = ({
  Component,
  pageProps,
}: {
  Component: NextComponentType<NextPageContext, any, object>;
  pageProps: any;
}) => {
  return <Component {...pageProps} />;
};

export default withTRPC<ServerRouter>({
  config({ ctx }) {
    const url = "http://localhost:3000/api/trpc";

    return { url };
  },
  ssr: true,
})(App);
