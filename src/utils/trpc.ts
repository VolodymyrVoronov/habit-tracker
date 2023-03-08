import { createReactQueryHooks } from "@trpc/react";
import type { ServerRouter } from "@/server/index";

const trpc = createReactQueryHooks<ServerRouter>();

export default trpc;
