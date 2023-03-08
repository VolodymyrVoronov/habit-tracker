import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createContext = (opts?: trpcNext.CreateNextContextOptions) => {
  return { ...opts, prisma };
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
