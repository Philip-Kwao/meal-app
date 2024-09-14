/*
  Warnings:

  - You are about to drop the column `mealId` on the `MealType` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Meal" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "image" TEXT NOT NULL,
    "isAvailableForPurchase" BOOLEAN NOT NULL DEFAULT true,
    "mealType" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Meal" ("createdAt", "description", "id", "image", "isAvailableForPurchase", "name", "price", "updatedAt") SELECT "createdAt", "description", "id", "image", "isAvailableForPurchase", "name", "price", "updatedAt" FROM "Meal";
DROP TABLE "Meal";
ALTER TABLE "new_Meal" RENAME TO "Meal";
CREATE TABLE "new_MealType" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);
INSERT INTO "new_MealType" ("id", "name") SELECT "id", "name" FROM "MealType";
DROP TABLE "MealType";
ALTER TABLE "new_MealType" RENAME TO "MealType";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
