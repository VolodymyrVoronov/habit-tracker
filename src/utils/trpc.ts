import { createReactQueryHooks } from "@trpc/react";
import type { ServerRouter } from "@/server/habitRouter";

const trpc = createReactQueryHooks<ServerRouter>();

export default trpc;
