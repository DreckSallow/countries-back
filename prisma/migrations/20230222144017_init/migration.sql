/*
  Warnings:

  - You are about to drop the column `countryId` on the `Border` table. All the data in the column will be lost.
  - You are about to drop the column `countryId` on the `Language` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Border" DROP CONSTRAINT "Border_countryId_fkey";

-- DropForeignKey
ALTER TABLE "Language" DROP CONSTRAINT "Language_countryId_fkey";

-- AlterTable
ALTER TABLE "Border" DROP COLUMN "countryId";

-- AlterTable
ALTER TABLE "Language" DROP COLUMN "countryId";

-- CreateTable
CREATE TABLE "LanguagesOnCountry" (
    "countryId" INTEGER NOT NULL,
    "languageId" INTEGER NOT NULL,

    CONSTRAINT "LanguagesOnCountry_pkey" PRIMARY KEY ("countryId","languageId")
);

-- CreateTable
CREATE TABLE "BordersOnCountry" (
    "countryId" INTEGER NOT NULL,
    "borderId" INTEGER NOT NULL,

    CONSTRAINT "BordersOnCountry_pkey" PRIMARY KEY ("countryId","borderId")
);

-- AddForeignKey
ALTER TABLE "LanguagesOnCountry" ADD CONSTRAINT "LanguagesOnCountry_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LanguagesOnCountry" ADD CONSTRAINT "LanguagesOnCountry_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BordersOnCountry" ADD CONSTRAINT "BordersOnCountry_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BordersOnCountry" ADD CONSTRAINT "BordersOnCountry_borderId_fkey" FOREIGN KEY ("borderId") REFERENCES "Border"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
