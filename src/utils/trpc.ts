import { createReactQueryHooks } from "@trpc/react";
import type { ServerRouter } from "@/server/router";

const trpc = createReactQueryHooks<ServerRouter>();

export default trpc;
