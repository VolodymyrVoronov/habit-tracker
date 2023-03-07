-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Habit" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "habit" TEXT NOT NULL,
    "habitInformation" TEXT,
    "target" INTEGER NOT NULL,
    "iconName" TEXT,
    "iconCode" TEXT,
    "comments" TEXT
);
INSERT INTO "new_Habit" ("comments", "habit", "habitInformation", "iconCode", "iconName", "id", "target") SELECT "comments", "habit", "habitInformation", "iconCode", "iconName", "id", "target" FROM "Habit";
DROP TABLE "Habit";
ALTER TABLE "new_Habit" RENAME TO "Habit";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
