import * as trpc from "@trpc/server";
import { z } from "zod";

import { Context } from "./context";

const Habit = z.object({
  habit: z.string(),
  habitInformation: z.string().optional(),
  target: z.number(),
  iconName: z.string().optional(),
  iconCode: z.string().optional(),
  comments: z.string().optional(),
});

const HabitWithId = Habit.extend({
  id: z.number(),
});

export const habitRouter = trpc
  .router<Context>()
  .query("findAllHabits", {
    async resolve({ ctx }) {
      return ctx.prisma.habit.findMany();
    },
  })

  .query("findHabitById", {
    input: z.object({
      id: z.number(),
    }),

    async resolve({ ctx, input }) {
      return ctx.prisma.habit.findUnique({
        where: {
          id: input.id,
        },
      });
    },
  })

  .mutation("crateHabit", {
    input: Habit,

    async resolve({ input, ctx }) {
      return ctx.prisma.habit.create({
        data: {
          habit: input.habit,
          habitInformation: input.habitInformation,
          target: input.target,
          iconName: input.iconName,
          iconCode: input.iconCode,
          comments: input.comments,
        },
      });
    },
  })

  .mutation("updateComments", {
    input: z.object({
      id: z.number(),
      comments: z.string(),
    }),

    async resolve({ input, ctx }) {
      return ctx.prisma.habit.update({
        where: {
          id: input.id,
        },
        data: {
          comments: input.comments,
        },
      });
    },
  })

  .mutation("deleteHabit", {
    input: z.object({
      id: z.number(),
    }),

    resolve: async ({ input, ctx }) => {
      const { id } = input;

      return ctx.prisma.habit.delete({
        where: {
          id,
        },
      });
    },
  });

export type HabitRouter = typeof habitRouter;
