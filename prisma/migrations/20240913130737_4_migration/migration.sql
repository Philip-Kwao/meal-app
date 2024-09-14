/*
  Warnings:

  - You are about to drop the column `mealType` on the `Meal` table. All the data in the column will be lost.
  - Added the required column `theMeal` to the `Meal` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Meal" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "theMeal" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "isAvailableForPurchase" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Meal" ("createdAt", "description", "id", "image", "isAvailableForPurchase", "name", "price", "updatedAt") SELECT "createdAt", "description", "id", "image", "isAvailableForPurchase", "name", "price", "updatedAt" FROM "Meal";
DROP TABLE "Meal";
ALTER TABLE "new_Meal" RENAME TO "Meal";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
