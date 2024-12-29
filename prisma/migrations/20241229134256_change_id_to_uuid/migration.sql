/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `Accommodation` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Accommodation` table. All the data in the column will be lost.
  - You are about to alter the column `name` on the `Accommodation` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `address` on the `Accommodation` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `description` on the `Accommodation` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `Accommodation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `localGovt` to the `Accommodation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Accommodation` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `type` on the `Accommodation` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "accommodation_type" AS ENUM ('Hotel', 'Airbnb', 'Resort', 'Apartment', 'Other');

-- DropForeignKey
ALTER TABLE "Accommodation" DROP CONSTRAINT "Accommodation_userId_fkey";

-- AlterTable
ALTER TABLE "Accommodation" DROP COLUMN "updatedAt",
DROP COLUMN "userId",
ADD COLUMN     "localGovt" VARCHAR(255) NOT NULL,
ADD COLUMN     "slug" VARCHAR(255) NOT NULL,
ALTER COLUMN "name" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "address" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "description" SET DATA TYPE VARCHAR(255),
DROP COLUMN "type",
ADD COLUMN     "type" "accommodation_type" NOT NULL,
ALTER COLUMN "createdAt" DROP NOT NULL,
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(6);

-- DropTable
DROP TABLE "User";

-- DropEnum
DROP TYPE "AccommodationType";

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_id_key" ON "users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Accommodation_name_key" ON "Accommodation"("name");
