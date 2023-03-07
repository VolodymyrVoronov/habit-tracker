/*
  Warnings:

  - You are about to drop the `GroceryList` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "GroceryList";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Habit" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "habit" TEXT NOT NULL,
    "habitInformation" TEXT NOT NULL,
    "target" INTEGER NOT NULL,
    "iconName" TEXT NOT NULL,
    "iconCode" TEXT NOT NULL,
    "comments" TEXT NOT NULL
);
