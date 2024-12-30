/*
  Warnings:

  - A unique constraint covering the columns `[name,slug]` on the table `Accommodation` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Accommodation_name_slug_key" ON "Accommodation"("name", "slug");
