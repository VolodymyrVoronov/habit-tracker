import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { PrismaClient } from "@prisma/client";

export const createContext = (opts?: trpcNext.CreateNextContextOptions) => {
  const prisma = new PrismaClient();

  return { ...opts, prisma };
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
