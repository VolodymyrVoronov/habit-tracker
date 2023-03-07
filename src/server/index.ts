import * as trpc from "@trpc/server";

import type { Context } from "./context";

import { habitRouter } from "./habitRouter";

export const serverRouter = trpc.router<Context>().merge(habitRouter);

export type ServerRouter = typeof serverRouter;
